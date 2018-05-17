import { ErrorCode } from '../Constants/errorCodes';
import { Config } from '../Configs';

// Báo cáo tổng hơp hệ thống
async function GetReportTotal() {
    var date = new Date().getDate();
    try {
        let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotal_ForApp', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            SystemID: 1,
            IsReport :1,
            Type :0,
            TypeAnalyze:1,
            GameRoom :0,
            ServiceID:-3,
            SourceID :-1,
            TypeReport :1,
            RequestDate:date,
          })
        });
        let responseJson = await response.json();
        return Promise.resolve(responseJson);
      } catch(error) {
        console.error(error);
      }
}

// GetService
async function GetService(TypeReport) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_GetListServices', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          TypeReport :TypeReport,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}


// GetSource
async function GetServiceSource(TypeReport) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_GetListServicesSource', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          TypeReport :TypeReport, 
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}

// GetSource
async function BR_ReportTotal_FlashChart(TypeAnalyze,SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotal_FlashChart', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          TypeReport:1,
          TypeAnalyze:TypeAnalyze,
          GameRoom:0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}

async function BR_ReportTotal_GetRows(SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotal_GetRows', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          GameRoom:0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}

async function BR_ReportTotal_Minute_FlashChart(TypeAnalyze,SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotal_Minute_FlashChart', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          TypeReport:1,
          TypeAnalyze:TypeAnalyze,
          GameRoom:0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}


async function BR_ReportTotal_Minute_GetRows(SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotal_Minute_GetRows', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          GameRoom:0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}


async function BR_ReportTotal_Detail_GetRows(SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotal_Detail_GetRows', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          GameRoom:0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}

async function BR_ReportTotal_FlashChart_Pie(SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotal_FlashChart_Pie', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          TypeReport:1,
          TypeAnalyze:TypeAnalyze,
          GameRoom:0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}


/// Báo cáo nạp
async function BR_ReportTotalInput_FlashChart(TypeReport,SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotalInput_FlashChart', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          TypeReport:TypeReport,
          TypeAnalyze:0,
          GameRoom:0,
          GroupID :0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}

async function BR_ReportTotalInput_FlashChart_Pie(TypeReport,SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotalInput_FlashChart_Pie', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          TypeReport:TypeReport,
          TypeAnalyze:0,
          GameRoom:0,
          GroupID :0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}

async function BR_ReportTotalInput_GetRows(TypeReport,SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotalInput_GetRows', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          TypeReport:TypeReport,
          TypeAnalyze:0,
          GameRoom:0,
          GroupID :0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}


async function BR_ReportTotalInput_Detail_GetRows(TypeReport,SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotalInput_Detail_GetRows', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          TypeReport:TypeReport,
          TypeAnalyze:0,
          GameRoom:0,
          GroupID :0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}

/// Báo cáo tiêu

async function BR_ReportTotalOutput_FlashChart(TypeReport,SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotalOutput_FlashChart', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          TypeReport:TypeReport,
          TypeAnalyze:0,
          GameRoom:0,
          GroupID :0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}

async function BR_ReportTotalOutput_FlashChart_Pie(TypeReport,SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotalOutput_FlashChart_Pie', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          TypeReport:TypeReport,
          TypeAnalyze:0,
          GameRoom:0,
          GroupID :0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}

async function BR_ReportTotalOutput_GetRows(TypeReport,SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotalOutput_GetRows', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          TypeReport:TypeReport,
          TypeAnalyze:0,
          GameRoom:0,
          GroupID :0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}


async function BR_ReportTotalOutput_Detail_GetRows(TypeReport,SourceID,ServiceID,BeginDate,EndDate) {
  try {
      let response = await fetch(Config.ACCOUNT_API + 'api/Report/BR_ReportTotalOutput_Detail_GetRows', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SystemID: 1,
          IsReport :1,
          Type :1,
          TypeReport:TypeReport,
          TypeAnalyze:0,
          GameRoom:0,
          GroupID :0,
          SourceID:SourceID,
          ServiceID:ServiceID,
          BeginDate:BeginDate,
          EndDate:EndDate,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
}

export const reportService = {
    GetReportTotal,
    GetServiceSource,
    BR_ReportTotal_FlashChart,
    BR_ReportTotal_Minute_FlashChart,
    BR_ReportTotal_FlashChart_Pie,
    BR_ReportTotal_Detail_GetRows,
    BR_ReportTotal_GetRows,
    BR_ReportTotal_Minute_GetRows,
    BR_ReportTotalInput_FlashChart,
    BR_ReportTotalInput_Detail_GetRows,
    BR_ReportTotalInput_GetRows,
    BR_ReportTotalInput_FlashChart_Pie,
    BR_ReportTotalOutput_FlashChart,
    BR_ReportTotalOutput_Detail_GetRows,
    BR_ReportTotalOutput_GetRows,
    BR_ReportTotalOutput_FlashChart_Pie
}

// Báo cáo doanh thu
