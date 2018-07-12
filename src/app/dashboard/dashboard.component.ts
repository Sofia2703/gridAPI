import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common/common.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  FilterSearch = '';
  //  FilterSearchOnHold = '';

  
  constructor(
    private _apiService: ApiService,
    private _common: CommonService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  resultData: any;
  
  async ngOnInit() {
    //----------------------------1------------------------
    // Active
    try {
      const data = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT CONCAT( xx.createdtime , ' : ' , xx.comments) FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('ADE (AP Down มีปัญหาบ่อย)','APD (อุปกรณ์กระจายสัญญาณขัดข้อง)') AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', data);
      if (response !== null) {
        this.resultData = response;
        this.resultData.link = decodeURIComponent(decodeURIComponent(this.resultData.link));
        console.log('link: ', this.resultData.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultData) {
          this.resultData[i].link = this._common.decodeURI(this.resultData[i].link);
          this.resultData[i].birth_date = this._common.convertDate(this.resultData[i].birth_date);
          
        }
      } else {
        this.resultData = [];
      }
    } catch (error) {
      console.log(error);
    }

    setInterval(async() => {
      await this.getData();
    }, 600000);

  }
    //OnHold
    
  /////////////Get data come to use//////////////////////


 //----------------------------1------------------------
  // Active
  async getData() {
    try {
      const data = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT CONCAT( xx.createdtime , ' : ' , xx.comments) FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('ADE (AP Down มีปัญหาบ่อย)','APD (อุปกรณ์กระจายสัญญาณขัดข้อง)') AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', data);
      if (response !== null) {
        this.resultData = response;
        this.resultData.link = decodeURIComponent(decodeURIComponent(this.resultData.link));
        console.log('link: ', this.resultData.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultData) {
          this.resultData[i].link = this._common.decodeURI(this.resultData[i].link);
          this.resultData[i].birth_date = this._common.convertDate(this.resultData[i].birth_date);
        }
      } else {
        this.resultData = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
}
