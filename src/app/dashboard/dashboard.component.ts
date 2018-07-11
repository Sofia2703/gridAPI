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
   FilterSearchOnHold = '';


  getColorDay(days){
    console.log(days)

      if(days > 0 && days <= 7){
        return '#32c5d2';
      }
      
      if (days >= 8 && days <= 15){
        return '#f0c332';
      }

      if (days >= 16){
        return '#e7505a';
      }
    }
  
  constructor(
    private _apiService: ApiService,
    private _common: CommonService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  resultData: any;
  resultNum:number = 0;
  resultDataOnHold: any;

  resultData2: any;
  resultNum2:number = 0;
  resultDataOnHold2: any;

  resultData3: any;
  resultNum3:number = 0;
  resultDataOnHold3: any;

  resultData4: any;
  resultNum4:number = 0;
  resultDataOnHold4: any;

  resultData5: any;
  resultNum5:number = 0;
  resultDataOnHold5: any;

  resultData6: any;
  resultNum6:number = 0;
  resultDataOnHold6: any;

  
  async ngOnInit() {
    //----------------------------1------------------------
    // Active
    try {
      const data = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'set (ติดตั้ง)' AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
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
          this.resultNum = this.resultData.length;
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


    //OnHold
    try {
      const dataOnHold = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'set (ติดตั้ง)' AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', dataOnHold);
      if (response !== null) {
        this.resultDataOnHold = response;
        this.resultDataOnHold.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold.link));
        console.log('link: ', this.resultDataOnHold.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultDataOnHold) {
          this.resultDataOnHold[i].link = this._common.decodeURI(this.resultDataOnHold[i].link);
          this.resultDataOnHold[i].birth_date = this._common.convertDate(this.resultDataOnHold[i].birth_date);
        }
      } else {
        this.resultDataOnHold = [];
      }
    } catch (error) {
      console.log(error);
    }

    setInterval(async() => {
      await this.getDataOnHold();
    }, 600000);

    //----------------------------2------------------------
     // Active
    try {
      const data2 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'RND (Renovate)' AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', data2);
      if (response !== null) {
        this.resultData2 = response;
        this.resultData2.link = decodeURIComponent(decodeURIComponent(this.resultData2.link));
        console.log('link: ', this.resultData2.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultData2) {
          this.resultData2[i].link = this._common.decodeURI(this.resultData2[i].link);
          this.resultData2[i].birth_date = this._common.convertDate(this.resultData2[i].birth_date);
          this.resultNum2 = this.resultData2.length;
        }
      } else {
        this.resultData2 = [];
      }
    } catch (error) {
      console.log(error);
    }

    setInterval(async() => {
      await this.getData2();
    }, 600000);


    //OnHold
    try {
      const dataOnHold2 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'RND (Renovate)' AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', dataOnHold2);
      if (response !== null) {
        this.resultDataOnHold2 = response;
        this.resultDataOnHold2.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold2.link));
        console.log('link: ', this.resultDataOnHold2.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultDataOnHold2) {
          this.resultDataOnHold2[i].link = this._common.decodeURI(this.resultDataOnHold2[i].link);
          this.resultDataOnHold2[i].birth_date = this._common.convertDate(this.resultDataOnHold2[i].birth_date);
        }
      } else {
        this.resultDataOnHold2 = [];
      }
    } catch (error) {
      console.log(error);
    }

    setInterval(async() => {
      await this.getDataOnHold2();

    }, 600000);
    //----------------------------3------------------------
      // Active
      try {
        const data3 = {
          // tslint:disable-next-line:max-line-length
          "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('SDE (Site Down บ่อย)','SDN (Site Down Reset แล้วใช้งานไม่ได้)') AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
          "params": ["vtiger_crmentity"]
        };
        let response = await this._apiService.post('dynamic', data3);
        if (response !== null) {
          this.resultData3 = response;
          console.log(this.resultData3);
          this.resultData3.link = decodeURIComponent(decodeURIComponent(this.resultData3.link));
          console.log('link: ', this.resultData3.link);
          // tslint:disable-next-line:forin
          for (const i in this.resultData3) {
            this.resultData3[i].link = this._common.decodeURI(this.resultData3[i].link);
            this.resultData3[i].birth_date = this._common.convertDate(this.resultData3[i].birth_date);
            this.resultNum3 = this.resultData3.length;
          }
        } else {
          this.resultData3 = [];
        }
      } catch (error) {
        console.log(error);
      }
  
      setInterval(async() => {
        await this.getData3();
      }, 600000);
  
  
      //OnHold
      try {
        const dataOnHold3 = {
          // tslint:disable-next-line:max-line-length
          "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('SDE (Site Down บ่อย)','SDN (Site Down Reset แล้วใช้งานไม่ได้)') AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
          "params": ["vtiger_crmentity"]
        };
        let response = await this._apiService.post('dynamic', dataOnHold3);
        if (response !== null) {
          this.resultDataOnHold3 = response;
          this.resultDataOnHold3.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold3.link));
          console.log('link: ', this.resultDataOnHold3.link);
          // tslint:disable-next-line:forin
          for (const i in this.resultDataOnHold3) {
            this.resultDataOnHold3[i].link = this._common.decodeURI(this.resultDataOnHold3[i].link);
            this.resultDataOnHold3[i].birth_date = this._common.convertDate(this.resultDataOnHold3[i].birth_date);
          }
        } else {
          this.resultDataOnHold3 = [];
        }
      } catch (error) {
        console.log(error);
      }
  
      setInterval(async() => {
        await this.getDataOnHold3();
      }, 600000);

    //----------------------------4------------------------
    try {
      const data4 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('ADE (AP Down มีปัญหาบ่อย)','APD (อุปกรณ์กระจายสัญญาณขัดข้อง)') AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', data4);
      if (response !== null) {
        this.resultData4 = response;
        this.resultData4.link = decodeURIComponent(decodeURIComponent(this.resultData4.link));
        console.log('link: ', this.resultData4.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultData4) {
          this.resultData4[i].link = this._common.decodeURI(this.resultData4[i].link);
          this.resultData4[i].birth_date = this._common.convertDate(this.resultData4[i].birth_date);
          this.resultNum4 = this.resultData4.length;
        }
      } else {
        this.resultData4 = [];
      }
    } catch (error) {
      console.log(error);
    }

    setInterval(async() => {
      await this.getData4();
    }, 600000);


    //OnHold
    try {
      const dataOnHold4 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('ADE (AP Down มีปัญหาบ่อย)','APD (อุปกรณ์กระจายสัญญาณขัดข้อง)') AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', dataOnHold4);
      if (response !== null) {
        this.resultDataOnHold4 = response;
        this.resultDataOnHold4.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold4.link));
        console.log('link: ', this.resultDataOnHold4.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultDataOnHold4) {
          this.resultDataOnHold4[i].link = this._common.decodeURI(this.resultDataOnHold4[i].link);
          this.resultDataOnHold4[i].birth_date = this._common.convertDate(this.resultDataOnHold4[i].birth_date);
        }
      } else {
        this.resultDataOnHold4 = [];
      }
    } catch (error) {
      console.log(error);
    }

    setInterval(async() => {
      await this.getDataOnHold4();

    }, 600000);
    //----------------------------5------------------------
    try {
      const data5 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('BNW (ตรวจสอบความเร็วเน็ต)','NDS (บางเส้นมีปัญหา Offline, Unplug)','NED (เนตหลุดบ่อย)','NES (Internet ช้า)','NET (Set Internet)') AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', data5);
      if (response !== null) {
        this.resultData5 = response;
        this.resultData5.link = decodeURIComponent(decodeURIComponent(this.resultData5.link));
        console.log('link: ', this.resultData5.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultData5) {
          this.resultData5[i].link = this._common.decodeURI(this.resultData5[i].link);
          this.resultData5[i].birth_date = this._common.convertDate(this.resultData5[i].birth_date);
          this.resultNum5 = this.resultData5.length;
        }
      } else {
        this.resultData5 = [];
      }
    } catch (error) {
      console.log(error);
    }

    setInterval(async() => {
      await this.getData5();
    }, 600000);


    //OnHold
    try {
      const dataOnHold5 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('BNW (ตรวจสอบความเร็วเน็ต)','NDS (บางเส้นมีปัญหา Offline, Unplug)','NED (เนตหลุดบ่อย)','NES (Internet ช้า)','NET (Set Internet)') AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', dataOnHold5);
      if (response !== null) {
        this.resultDataOnHold5 = response;
        this.resultDataOnHold5.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold5.link));
        console.log('link: ', this.resultDataOnHold5.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultDataOnHold5) {
          this.resultDataOnHold5[i].link = this._common.decodeURI(this.resultDataOnHold5[i].link);
          this.resultDataOnHold5[i].birth_date = this._common.convertDate(this.resultDataOnHold5[i].birth_date);
        }
      } else {
        this.resultDataOnHold5 = [];
      }
    } catch (error) {
      console.log(error);
    }

    setInterval(async() => {
      await this.getDataOnHold5();
    }, 600000);
    //----------------------------6------------------------
    try {
      const data6 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'CUS (ตรวจสอบเครื่องลูกค้า)' AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', data6);
      if (response !== null) {
        this.resultData6 = response;
        this.resultData6.link = decodeURIComponent(decodeURIComponent(this.resultData6.link));
        console.log('link: ', this.resultData6.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultData6) {
          this.resultData6[i].link = this._common.decodeURI(this.resultData6[i].link);
          this.resultData6[i].birth_date = this._common.convertDate(this.resultData6[i].birth_date);
          this.resultNum6 = this.resultData6.length;
        }
      } else {
        this.resultData6 = [];
      }
    } catch (error) {
      console.log(error);
    }

    setInterval(async() => {
      await this.getData6();
    }, 600000);


    //OnHold
    try {
      const dataOnHold6 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'CUS (ตรวจสอบเครื่องลูกค้า)' AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', dataOnHold6);
      if (response !== null) {
        this.resultDataOnHold6 = response;
        this.resultDataOnHold6.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold6.link));
        console.log('link: ', this.resultDataOnHold6.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultDataOnHold6) {
          this.resultDataOnHold6[i].link = this._common.decodeURI(this.resultDataOnHold6[i].link);
          this.resultDataOnHold6[i].birth_date = this._common.convertDate(this.resultDataOnHold6[i].birth_date);
        }
      } else {
        this.resultDataOnHold6 = [];
      }
    } catch (error) {
      console.log(error);
    }

    setInterval(async() => {
      await this.getDataOnHold6();
    }, 600000);
  }

  /////////////Get data come to use//////////////////////


 //----------------------------1------------------------
  // Active
  async getData() {
    try {
      const data = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'set (ติดตั้ง)' AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
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
  //On Hold
  async getDataOnHold() {
    try {
      const dataOnHold = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'set (ติดตั้ง)' AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', dataOnHold);
      if (response !== null) {
        this.resultDataOnHold = response;
        this.resultDataOnHold.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold.link));
        console.log('link: ', this.resultDataOnHold.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultDataOnHold) {
          this.resultDataOnHold[i].link = this._common.decodeURI(this.resultDataOnHold[i].link);
          this.resultDataOnHold[i].birth_date = this._common.convertDate(this.resultDataOnHold[i].birth_date);
        }
      } else {
        this.resultDataOnHold = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  //----------------------------2------------------------
   // Active
  async getData2() {
    try {
      const data2 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'RND (Renovate)' AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', data2);
      if (response !== null) {
        this.resultData2 = response;
        this.resultData2.link = decodeURIComponent(decodeURIComponent(this.resultData2.link));
        console.log('link: ', this.resultData2.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultData2) {
          this.resultData2[i].link = this._common.decodeURI(this.resultData2[i].link);
          this.resultData2[i].birth_date = this._common.convertDate(this.resultData2[i].birth_date);
        }
      } else {
        this.resultData2 = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  //On Hold
  async getDataOnHold2() {
    try {
      const dataOnHold2 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'RND (Renovate)' AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', dataOnHold2);
      if (response !== null) {
        this.resultDataOnHold2 = response;
        this.resultDataOnHold2.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold2.link));
        console.log('link: ', this.resultDataOnHold2.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultDataOnHold) {
          this.resultDataOnHold2[i].link = this._common.decodeURI(this.resultDataOnHold2[i].link);
          this.resultDataOnHold2[i].birth_date = this._common.convertDate(this.resultDataOnHold2[i].birth_date);
        }
      } else {
        this.resultDataOnHold2 = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  //----------------------------3------------------------
    // Active
    async getData3() {
      try {
        const data3 = {
          // tslint:disable-next-line:max-line-length
          "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('SDE (Site Down บ่อย)','SDN (Site Down Reset แล้วใช้งานไม่ได้)') AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
          "params": ["vtiger_crmentity"]
        };
        let response = await this._apiService.post('dynamic', data3);
        if (response !== null) {
          this.resultData3 = response;
          this.resultData3.link = decodeURIComponent(decodeURIComponent(this.resultData3.link));
          console.log('link: ', this.resultData3.link);
          // tslint:disable-next-line:forin
          for (const i in this.resultData3) {
            this.resultData3[i].link = this._common.decodeURI(this.resultData3[i].link);
            this.resultData3[i].birth_date = this._common.convertDate(this.resultData3[i].birth_date);
          }
        } else {
          this.resultData3 = [];
        }
      } catch (error) {
        console.log(error);
      }
    }

    //On Hold
    async getDataOnHold3() {
      try {
        const dataOnHold3 = {
          // tslint:disable-next-line:max-line-length
          "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('SDE (Site Down บ่อย)','SDN (Site Down Reset แล้วใช้งานไม่ได้)') AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
          "params": ["vtiger_crmentity"]
        };
        let response = await this._apiService.post('dynamic', dataOnHold3);
        if (response !== null) {
          this.resultDataOnHold3 = response;
          this.resultDataOnHold3.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold3.link));
          console.log('link: ', this.resultDataOnHold3.link);
          // tslint:disable-next-line:forin
          for (const i in this.resultDataOnHold) {
            this.resultDataOnHold3[i].link = this._common.decodeURI(this.resultDataOnHold3[i].link);
            this.resultDataOnHold3[i].birth_date = this._common.convertDate(this.resultDataOnHold3[i].birth_date);
          }
        } else {
          this.resultDataOnHold3 = [];
        }
      } catch (error) {
        console.log(error);
      }
    }

  //----------------------------4------------------------
   // Active
   async getData4() {
    try {
      const data4 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('ADE (AP Down มีปัญหาบ่อย)','APD (อุปกรณ์กระจายสัญญาณขัดข้อง)') AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', data4);
      if (response !== null) {
        this.resultData4 = response;
        this.resultData4.link = decodeURIComponent(decodeURIComponent(this.resultData4.link));
        console.log('link: ', this.resultData4.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultData4) {
          this.resultData4[i].link = this._common.decodeURI(this.resultData4[i].link);
          this.resultData4[i].birth_date = this._common.convertDate(this.resultData4[i].birth_date);
        }
      } else {
        this.resultData4 = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  //On Hold
  async getDataOnHold4() {
    try {
      const dataOnHold4 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('ADE (AP Down มีปัญหาบ่อย)','APD (อุปกรณ์กระจายสัญญาณขัดข้อง)') AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', dataOnHold4);
      if (response !== null) {
        this.resultDataOnHold4 = response;
        this.resultDataOnHold4.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold4.link));
        console.log('link: ', this.resultDataOnHold4.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultDataOnHold4) {
          this.resultDataOnHold4[i].link = this._common.decodeURI(this.resultDataOnHold4[i].link);
          this.resultDataOnHold4[i].birth_date = this._common.convertDate(this.resultDataOnHold4[i].birth_date);
        }
      } else {
        this.resultDataOnHold4 = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  //----------------------------5------------------------
   // Active
   async getData5() {
    try {
      const data5 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('BNW (ตรวจสอบความเร็วเน็ต)','NDS (บางเส้นมีปัญหา Offline, Unplug)','NED (เนตหลุดบ่อย)','NES (Internet ช้า)','NET (Set Internet)') AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', data5);
      if (response !== null) {
        this.resultData5 = response;
        this.resultData5.link = decodeURIComponent(decodeURIComponent(this.resultData5.link));
        console.log('link: ', this.resultData5.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultData5) {
          this.resultData5[i].link = this._common.decodeURI(this.resultData5[i].link);
          this.resultData5[i].birth_date = this._common.convertDate(this.resultData5[i].birth_date);
        }
      } else {
        this.resultData5 = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  //On Hold
  async getDataOnHold5() {
    try {
      const dataOnHold5 = {
        // tslint:disable-next-line:max-line-length
        "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) IN ('BNW (ตรวจสอบความเร็วเน็ต)','NDS (บางเส้นมีปัญหา Offline, Unplug)','NED (เนตหลุดบ่อย)','NES (Internet ช้า)','NET (Set Internet)') AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
        "params": ["vtiger_crmentity"]
      };
      let response = await this._apiService.post('dynamic', dataOnHold5);
      if (response !== null) {
        this.resultDataOnHold5 = response;
        this.resultDataOnHold5.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold5.link));
        console.log('link: ', this.resultDataOnHold5.link);
        // tslint:disable-next-line:forin
        for (const i in this.resultDataOnHold5) {
          this.resultDataOnHold5[i].link = this._common.decodeURI(this.resultDataOnHold5[i].link);
          this.resultDataOnHold5[i].birth_date = this._common.convertDate(this.resultDataOnHold5[i].birth_date);
        }
      } else {
        this.resultDataOnHold5 = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  //----------------------------6------------------------
 // Active
 async getData6() {
  try {
    const data6 = {
      // tslint:disable-next-line:max-line-length
      "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'CUS (ตรวจสอบเครื่องลูกค้า)' AND LCASE(vtiger_troubletickets. STATUS) not in('closed' , 'Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
      "params": ["vtiger_crmentity"]
    };
    let response = await this._apiService.post('dynamic', data6);
    if (response !== null) {
      this.resultData6 = response;
      this.resultData6.link = decodeURIComponent(decodeURIComponent(this.resultData6.link));
      console.log('link: ', this.resultData6.link);
      // tslint:disable-next-line:forin
      for (const i in this.resultData6) {
        this.resultData6[i].link = this._common.decodeURI(this.resultData6[i].link);
        this.resultData6[i].birth_date = this._common.convertDate(this.resultData6[i].birth_date);
      }
    } else {
      this.resultData6 = [];
    }
  } catch (error) {
    console.log(error);
  }
}
//On Hold
async getDataOnHold6() {
  try {
    const dataOnHold6 = {
      // tslint:disable-next-line:max-line-length
      "query": "SELECT vtiger_account.accountname AS custgroupName , vtiger_troubletickets.ticketid AS id , IF( vtiger_groups.groupname IS NOT NULL , vtiger_groups.groupname , vu.user_name) AS team , vtiger_troubletickets.title , vtiger_troubletickets. STATUS , vtiger_troubletickets.priority , CONCAT( 'http%3A%2F%2Fvtiger.sourcecode.co.th%2Findex.php%3Faction%3DDetailView%26module%3DHelpDesk%26parenttab%3DSupport%26record%3D' , vtiger_troubletickets.ticketid) AS link ,( SELECT xx.comments FROM vtiger_ticketcomments xx WHERE xx.ticketid = vtiger_troubletickets.ticketid ORDER BY xx.createdtime DESC LIMIT 1) AS COMMENT , CASE vtiger_troubletickets. STATUS WHEN 'Closed' THEN( unix_timestamp(vtiger_crmentity.modifiedtime) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 ELSE( unix_timestamp(now()) - unix_timestamp(vtiger_crmentity.createdtime)) / 86400 END AS days , concat( vtiger_ticketcf.cf_568 , ' (' , vtiger_cf_568.day_amount , ')') AS type , IFNULL(( SELECT 'Wait for response by' FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , 'Created by') userType , IFNULL(( SELECT concat('' , assigned_by , '') FROM vtiger_ticket_history WHERE vtiger_troubletickets.ticketid = vtiger_ticket_history.ticketid AND assigned_type = 'Wait for response' ORDER BY updatetime DESC LIMIT 0 , 1) , vtiger_users.user_name) username , vtiger_crmentity.description , vtiger_crmentity.createdtime , vtiger_crmentity.modifiedtime , vtiger_cf_568.cf_568id FROM vtiger_crmentity JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smcreatorid JOIN vtiger_troubletickets ON vtiger_crmentity.crmid = vtiger_troubletickets.ticketid JOIN vtiger_account ON vtiger_account.accountid = vtiger_troubletickets.parent_id JOIN vtiger_ticketcf ON vtiger_ticketcf.ticketid = vtiger_troubletickets.ticketid JOIN vtiger_cf_568 ON vtiger_cf_568.cf_568 = vtiger_ticketcf.cf_568 LEFT OUTER JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT OUTER JOIN vtiger_users vu ON vtiger_crmentity.smownerid = vu.id WHERE 1 AND vtiger_crmentity.setype = 'HelpDesk' AND vtiger_crmentity.deleted = 0 AND vtiger_ticketcf.cf_568 != '' AND vtiger_cf_568.cf_568id NOT IN(8 , 9 , 10) AND( LCASE(vtiger_cf_568.cf_568) = 'CUS (ตรวจสอบเครื่องลูกค้า)' AND LCASE(vtiger_troubletickets. STATUS) IN('Wait For Customer')) GROUP BY vtiger_troubletickets.ticketid ORDER BY vtiger_crmentity.createdtime ASC LIMIT 0 , 100",
      "params": ["vtiger_crmentity"]
    };
    let response = await this._apiService.post('dynamic', dataOnHold6);
    if (response !== null) {
      this.resultDataOnHold6 = response;
      this.resultDataOnHold6.link = decodeURIComponent(decodeURIComponent(this.resultDataOnHold6.link));
      console.log('link: ', this.resultDataOnHold6.link);
      // tslint:disable-next-line:forin
      for (const i in this.resultDataOnHold6) {
        this.resultDataOnHold6[i].link = this._common.decodeURI(this.resultDataOnHold6[i].link);
        this.resultDataOnHold6[i].birth_date = this._common.convertDate(this.resultDataOnHold6[i].birth_date);
      }
    } else {
      this.resultDataOnHold6 = [];
    }
  } catch (error) {
    console.log(error);
  }
}
}