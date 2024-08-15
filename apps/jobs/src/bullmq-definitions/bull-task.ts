import { Queue, Worker } from "bullmq";

export const BullTask = ({
  queueName,
  work,
}: {
  queueName: string;
  work: (data: unknown) => Promise<void>;
}) => {
  let queue: Queue;

  return {
    addJob: (jobName: string, data: unknown) => {
      if (!queue) {
        throw new Error("Queue not created");
      }
      return queue.add(jobName, data);
    },
    createQueue: () => {
      // @todo should we track this so only one queue is created?
      // if memory serves me right, as long as we use the same QueueName, it will use the same queue
      // so we can just create a new queue with the same name
      queue = new Queue(queueName, {
        connection: {
          host: "localhost",
          port: 6381,
          // @todo
          password: "your_password",
        },
      });
    },
    getStatus: async (jobId: string) => {
      const j = await queue.getJob(jobId);
      return j?.getState();
    },
    spawnWorker: () => {
      // @todo should we add count to track # of workers?
      const worker = new Worker(
        queueName,
        async (job) => {
          console.log("starting --- ", job.id);
          await work(job.data);
        },
        {
          connection: {
            host: "localhost",
            port: 6381,
            // @todo
            password: "your_password",
          },
        },
      );

      worker.on("completed", (job) => {
        console.log(`${job.id} has completed!`);
      });

      worker.on("failed", (job, err) => {
        console.log(`${job?.id} has failed with ${err.message}`);
      });
    },
  };
};
