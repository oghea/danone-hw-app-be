const {
  hydration_history: HydrationHistory
} = require('models');

const {
  uniqueArray
} = require('lib/helper')

exports.createHydrationHistory = async (ctx) => {
  const data = ctx.request.body

  const clearData = uniqueArray(data);

  for (let index = 0; index < clearData.length; index++) {
    const element = clearData[index];
    const uniqueKey = `${element.time}${ctx.user.id}${element.deviceId}`;

    const isExist = await HydrationHistory.findAndCountAll({
      where: {
        uniqueKey: uniqueKey
      }
    });

    if (isExist.count == 0) {
      const hydrationData = {
        status: element.status,
        time: element.time,
        userId: ctx.user.id,
        family: element.family,
        deviceId: element.deviceId,
        uniqueKey: uniqueKey
      }
      await HydrationHistory.create(hydrationData);
    }
  }

  ctx.body = 'Sucess Input and Filter Data'
}

exports.deleteAllHydrationData = async (ctx) => {
  await HydrationHistory.destroy({
    truncate: true
  });

  ctx.body = 'Sucess Delete All Data'
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