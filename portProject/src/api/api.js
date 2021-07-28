import http from '../http/http.js';
export default {

    //获取箱货界面table数据
    getListInfoAPI(params){
        return http.post('/TopsQbd/EventIYCGDSQuery',params);
    },

    //获取搜索条件下拉框数据
    getSelectListAPI(params){
        return http.post('/TopsRef/EventIYCGDSRefs',params);
    },


    //获取table展开行信息
    getTableInfoAPI(params){
        return http.post('/TopsQbd/EventGetIYCByID',params);
    },


    //获取箱动态信息
    getBoxDynamic(params){
        return http.post('/TopsQbd/EventGetOpRecordsByID',params);
    },



    // 详情页箱审计模块---------------------------------------------------------------------------------------------------------

    //获取箱审计信息
    getBoxAuditTab1(params){
        return http.post('/TopsQbd/EventGetIYCAuditByID',params);
    },
    //获取删除提单审计信息
    getBoxAuditTab2(params){
        return http.post('/TopsQbd/EventGetDelBillAuditByID',params);
    },
    //获取VGM审计信息
    getBoxAuditTab3(params){
        return http.post('/TopsQbd/EventGetVGMAuditByID',params);
    },
    //获取危险品预检审计信息
    getBoxAuditTab4(params){
        return http.post('/TopsQbd/EventGetDmgCheckAuditByID',params);
    },
    //获取冷藏箱管理审计
    getBoxAuditTab5(params){
        return http.post('/TopsQbd/EventGetRFMangerAuditByID',params);
    },



    //退关----------------------------------------------------------------------------------------------------
    getPromptShipment(params){
        return http.post('/TopsQbd/EventGetShutOutByID',params)
    },

    //受理计划-------------------------------------------------------------------------------------------------
    //受理计划
    getAcceptancePlan(params){
        return http.post('/TopsQbd/EventCntrArrangePlansByID',params);
    },
    //用箱审计
    getEmployBoxAudit(params){
        return http.post('/TopsQbd/EventUseContainerAuditByID',params);
    },




    //外集卡托运-----------------------------------------------------------------------------------------------
    getCollectCardsConsign(params){
        return http.post('/TopsQbd/EventGetOutTruckDragCntrsByID',params)
    },
    //外集卡托运——换箱门付费发票号审计
    getCollectCardsConsignBottom(params){
        return http.post('/TopsQbd/EventGetGtsOuttruckHaulCntrJNByOhcID',params);
    },




    //报文发送情况---------------------------------------------------------------------------------------------
    //运抵报告信息
    getNoticeSituationArrive(params){
        return http.post('/TopsQbd/EventGetArrivalNoticeByID',params)
    },
    //进出门报文信息
    getNoticeSituationAccess(params){
        return http.post('/TopsQbd/EventGetInOutPackageByID',params)
    },





    //辅助作业记录---------------------------------------------------------------------------------------------
    getTaskMonitoringRecord(params){
        return http.post('/TopsQbd/EventGetAddOpRecordByID',params);
    },



    //船图箱--------------------------------------------------------------------------------------------------
    getShipPictureBox(params){
        return http.post('/TopsQbd/EventStowagePlanContainerAuditByID',params);
    },



    //箱费用--------------------------------------------------------------------------------------------------
    getBoxCost(params){
        return http.post('/TopsQbd/EventGetContainerFeeListByID',params);
    },




    // 转推计划-----------------------------------------------------------------------------------------------
    getShiftingPlan(params){
        return http.post('/TopsQbd/EventShiftPlanCntrByID',params)
    },




    //指令----------------------------------------------------------------------------------------------------
    // 作业指令
    getInstructions(params){
        return http.post('/TopsQbd/EventOperInstructionByID',params)
    },
    // 调度日志
    getDispatchJournal(params){
        return http.post('/TopsQbd/EventTrucDispatchLogAuditByID',params)
    },



    // EDI记录------------------------------------------------------------------------------------------------
    getEDIRecord(params){
        return http.post('/TopsQbd/EventGetArriveInfoEDIByID',params)
    },

    //箱组----------------------------------------------------------------------------------------------------
    getBoxGroup(params){
        return http.post('/TopsQbd/EventChildContainersByID',params);
    },

    //残损登记------------------------------------------------------------------------------------------------
    getDamagedRegister(params){
        return http.post('/TopsQbd/EventCntrDamageRecordByID',params);
    },


    //货信息
    getCargoInfo(params){
        return http.post('/TopsQbd/EventGetGoodsListEByInOutHistory',params)
    }

    
}