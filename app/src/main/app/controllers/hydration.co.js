const {
  hydration_history: HydrationHistory,
  user: User,
  profile: Profile

} = require('models');

const {
  uniqueArray
} = require('lib/helper')

const Excel = require('exceljs');

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
        uniqueKey: uniqueKey,
        hydrationStatus: element.hydrationStatus,
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

exports.downloadExcelHydration = async (ctx) => {
  const hydration = await HydrationHistory.findAll({
    include: [{
      model: User,
    }]
  });

  const family = await Profile.findAll({
    include: [{
      model: User,
    }]
  });

  let freshHydration = [];
  let freshFamily = [];

  hydration.forEach((obj) => {
    freshHydration.push({
      id: obj.id,
      customerName: obj.user.name,
      status: obj.status,
      time: obj.time,
      deviceId: obj.deviceId,
      family: obj.family,
      hydrationStatus: obj.hydrationStatus
    });
  });


  family.forEach(async (obj) => {

    freshFamily.push({
      id: obj.id,
      customerName: obj.user.name,
      dewasaP: obj.dewasaP,
      dewasaL: obj.dewasaL,
      anak: obj.anak,
      hydrationNeed: (obj.dewasaL * 2000) + (obj.dewasaP * 1880) + (obj.anak * 1480),
    });
  });

  const workbook = new Excel.Workbook()
  const reportHydration = workbook.addWorksheet("Report Hydration")
  reportHydration.columns = [{
      header: "Id",
      key: "id",
      width: 5
    },

    {
      header: "Device Id",
      key: "deviceId",
      width: 10
    },
    {
      header: "Customer Name",
      key: "customerName",
      width: 10
    },
    {
      header: "Status",
      key: "status",
      width: 25
    },
    {
      header: "Time",
      key: "time",
      width: 25
    },
    {
      header: "Family",
      key: "family",
      width: 10
    },
    {
      header: "Hydration Status",
      key: "hydrationStatus",
      width: 10
    },
  ];

  reportHydration.addRows(freshHydration);

  const reportFamily = workbook.addWorksheet("Report Family")
  reportFamily.columns = [{
      header: "Customer Name",
      key: "customerName",
      width: 10
    },
    {
      header: "Dewasa Laki",
      key: "dewasaL",
      width: 25
    },
    {
      header: "Dewasa Perempuan",
      key: "dewasaP",
      width: 25
    },
    {
      header: "Anak Anak",
      key: "anak",
      width: 10
    },
    {
      header: "Calculated hydration need (ml)",
      key: "hydrationNeed",
      width: 10
    },
  ];

  reportFamily.addRows(freshFamily);

  ctx.response.attachment("report.xlsx")
  ctx.status = 200
  await workbook.xlsx.write(ctx.res)
  ctx.res.end()
}