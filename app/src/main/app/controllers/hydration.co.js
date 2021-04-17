const {
  hydration_history: HydrationHistory
} = require('models');

exports.createHydrationHistory = async (ctx) => {
  const data = ctx.request.body

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const hydrationData = {
      status: element.status,
      time: element.time,
      userId: ctx.user.id
    }
    await HydrationHistory.create(hydrationData);
  }

  ctx.body = 'sucess'
}

exports.getHydrationHistory = async (ctx) => {
  const data = await HydrationHistory.findAll({
    where: {
      userId: ctx.user.id
    }
  });

  ctx.body = data
}

exports.getHydrationHistoryAdmin = async (ctx) => {
  const data = await HydrationHistory.findAll();

  ctx.body = data
}