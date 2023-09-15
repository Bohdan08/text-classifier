class MyClassificationPipeline {
  static task = "text-classification";
  //   static model = "Xenova/distilbert-base-uncased-finetuned-sst-2-english";
  static model = "Xenova/toxic-bert";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // Dynamically import the Transformers.js library
      let { pipeline, env } = await import("@xenova/transformers");

      // NOTE: Uncomment this to change the cache directory
      // env.cacheDir = './.cache';

      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

MyClassificationPipeline.getInstance();

// module.exports = MyClassificationPipeline
module.exports = { MyClassificationPipeline };
