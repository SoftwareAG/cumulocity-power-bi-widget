
# Power BI Widget for Cumulocity [<img width="35" src="https://user-images.githubusercontent.com/67993842/97668428-f360cc80-1aa7-11eb-8801-da578bda4334.png"/>](https://github.com/SoftwareAG/cumulocity-power-bi-widget/releases/download/v1.0.0/powerbi-runtime-widget-1.0.0.zip)

  

The Power BI widget help you to display reports created from data offloaded from DataHub seamlessly in application.

  
![Power_BI](https://user-images.githubusercontent.com/99970126/181720578-e55d7911-bad6-4932-a27c-14232d1647b3.png)

![Power_BI_Config](https://user-images.githubusercontent.com/99970126/181721134-5517d55a-56fe-4eff-8073-37e3559914b2.png)



  

### Please verify that you are using below Application builder version:

  
|APPLICATION BUILDER | CUMULOCITY | POWER BI WIDGET    |
|--------------------|------------|------------------------|
| 1.3.x              | >= 1011.x.x| 1.x.x                  |

  
  
  

## Features

  
*  **DataHub Integration :** Seamless data visualization from DataHub using PowerBI workspace and report selection.

*  **PowerBI Configuration:** Ability to configure various PowerBI report options.

*  **Workspace Selection:** Ability to select the workspace.

*  **Reports:** Select the respective report from list of available reports under the workspace selected.


## Prerequisite
   * DataHub should be subscribed, configured and installed in the tenant.
   * Reports should be created in PowerBI and you should have connection for PowerBI configured in DataHub.

* Minimum Permission needed:
DataHub_Manager

* For more information on DataHub,click here:
https://cumulocity.com/guides/datahub/datahub-overview/ 

## Installation


### Runtime Widget Deployment?

  

* This widget support runtime deployment. Download [Runtime Binary](https://github.com/SoftwareAG/cumulocity-power-bi-widget/releases/download/v1.0.0/powerbi-runtime-widget-1.0.0.zip) and use Application-builder to install your widget.

  

### Installation of widget through AppBuilder

  

**Supported Cumulocity Environments:**

  

*  **App Builder:** Tested with Cumulocity App Builder version 1.3.0

  

**Requirements:**

  

* Git

  

* NodeJS (release builds are currently built with `v14.15.0`)

  

* NPM (Included with NodeJS)

  

**External dependencies:**

  

```
"@powerbi-client": "^2.19.1",
```

  

**Installation Steps For App Builder:**

  
  

**Note:** If you are new to App Builder or not yet downloaded/clone app builder code then please follow [App builder documentation(Build Instructions)](https://github.com/SoftwareAG/cumulocity-app-builder) before proceeding further.

  
  
  

1. Open Your existing App Builder project and install external dependencies by executing below command or install it manually.

  

```
npm i powerbi-client@^2.19.1
```

2. Grab the Power BI Widget **[Latest Release Binary](https://github.com/SoftwareAG/cumulocity-power-bi-widget/releases/download/v1.0.0/gp-powerbi-widget-1.0.0.tgz)**.

  
  

3. Install the Binary file in app builder.

  

```
npm i <binary file path>/gp-powerbi-widget-1.0.0.tgz
```

  

4. Import GpPowerbitWidgetModule in custom-widget.module.ts file located at /cumulocity-app-builder/custom-widgets/

  

```
import {GpPowerbiWidgetModule} from 'gp-powerbi-widget.module';
@NgModule({
imports: [
GpPowerbiWidgetModule
]
})
```

  

9. Congratulation! Installation is now completed. Now you can run app builder locally or build and deploy it into your tenant.

  

```
//Start App Builder
npm run start

// Build App 
npm run build
  
// Deploy App
npm run deploy
```

  

## Build Instructions

  

**Note:** It is only necessary to follow these instructions if you are modifying/extending this widget, otherwise see the [Installation Guide](#Installation).

  

**Requirements:**

* Git

  

* NodeJS (release builds are currently built with `v14.15.0`)

  

* NPM (Included with NodeJS)

  

**Instructions**

  
  

1. Clone the repository:

  

```
git clone https://github.com/SoftwareAG/cumulocity-powerbi-widget.git
```

  

2. Change directory:

  

```
cd cumulocity-powerbi-widget
```

  

3. (Optional) Checkout a specific version:

  

```
git checkout <your version>
```

  

4. Install the dependencies:

  

```
npm install
```

  

5. (Optional) Local development server:

  

```
npm run start
```

  

6. Build the app:

  

```
npm run build
```

  

7. Deploy the app:

  

```
npm run deploy
```

  

## QuickStart

  

This guide will teach you how to add widget in your existing or new dashboard.

  

  

**NOTE:** This guide assumes you have followed the [Installation instructions](#Installation)

  

  

1. Open you application from App Switcher

  

2. Add new dashboard or navigate to existing dashboard

  

3. Click `Add Widget`

  

4. Search for `Power BI`

  
  

5. Select `Target API or Datahub`

  
  

6. Fill Options required

  

7. Click `Save`

  
  

Congratulations! Power BI is configured.

  

  

## User Guide

  

  

-  **DataHub URL :** User can specify DataHub URL if needed or use default.

-  **PowerBI URL :** User can specify Power BI URL if needed or use default.
-  **Embed URL :** User can specify Embed Report if needed(in case it has been updated on Power BI) or use default.

-  **Load Workspace :** In case user changes DataHub or Power BI URL then they need to click this button to make a call to power BI and get the workspace and reports available if any. If the path is wrong, error will be shown.
-  **Nav Pane :** To show Navigation Pane in Power BI Report or not. This comes from Power BI and is used if your workspace has more than one report in same page.
-  **Filter Pane :** To show the Filter Pane in Power BI report or not. This comes from Power BI and can be used to see runtime changes in report based on filter applied.

-  **Workspace :** Choose the workspace from dropdown list. Once selected, the reports dropdown is populated accordingly.

-  **Report :** Choose the report from dropdown list.

  

NOTE : By default, first workspace and first report under that workspace comes selected.

------------------------------

  

This widget is provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.

  

_____________________

  

For more information you can Ask a Question in the [TECHcommunity Forums](https://tech.forums.softwareag.com/tag/Cumulocity-IoT).

  
  

You can find additional information in the [Software AG TECHcommunity](https://techcommunity.softwareag.com/home/-/product/name/cumulocity).
