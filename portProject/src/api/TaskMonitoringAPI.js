import http from '../http/http.js';
export default {
    getEarlyWarning(params){
        return http.post('/Warning/EventGetWarningDataSet',params);
    },
}