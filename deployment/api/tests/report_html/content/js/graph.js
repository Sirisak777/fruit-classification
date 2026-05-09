/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 219.0, "minX": 0.0, "maxY": 10688.0, "series": [{"data": [[0.0, 219.0], [0.1, 244.0], [0.2, 247.0], [0.3, 247.0], [0.4, 250.0], [0.5, 259.0], [0.6, 274.0], [0.7, 401.0], [0.8, 406.0], [0.9, 545.0], [1.0, 563.0], [1.1, 571.0], [1.2, 571.0], [1.3, 572.0], [1.4, 575.0], [1.5, 677.0], [1.6, 695.0], [1.7, 695.0], [1.8, 791.0], [1.9, 793.0], [2.0, 794.0], [2.1, 798.0], [2.2, 799.0], [2.3, 802.0], [2.4, 937.0], [2.5, 955.0], [2.6, 979.0], [2.7, 1185.0], [2.8, 1185.0], [2.9, 1188.0], [3.0, 1246.0], [3.1, 1252.0], [3.2, 1254.0], [3.3, 1254.0], [3.4, 1254.0], [3.5, 1255.0], [3.6, 1297.0], [3.7, 1332.0], [3.8, 1344.0], [3.9, 1374.0], [4.0, 1398.0], [4.1, 1754.0], [4.2, 1759.0], [4.3, 1760.0], [4.4, 1760.0], [4.5, 1768.0], [4.6, 1783.0], [4.7, 1816.0], [4.8, 1816.0], [4.9, 1817.0], [5.0, 1819.0], [5.1, 1824.0], [5.2, 1825.0], [5.3, 1826.0], [5.4, 1828.0], [5.5, 1948.0], [5.6, 1969.0], [5.7, 1986.0], [5.8, 2007.0], [5.9, 2021.0], [6.0, 2053.0], [6.1, 2072.0], [6.2, 2695.0], [6.3, 2709.0], [6.4, 2712.0], [6.5, 2714.0], [6.6, 2714.0], [6.7, 2715.0], [6.8, 2715.0], [6.9, 2715.0], [7.0, 2716.0], [7.1, 2718.0], [7.2, 2718.0], [7.3, 2721.0], [7.4, 2723.0], [7.5, 2725.0], [7.6, 2725.0], [7.7, 2733.0], [7.8, 2734.0], [7.9, 2738.0], [8.0, 2740.0], [8.1, 2743.0], [8.2, 2743.0], [8.3, 2747.0], [8.4, 2941.0], [8.5, 2962.0], [8.6, 2982.0], [8.7, 3003.0], [8.8, 3027.0], [8.9, 3051.0], [9.0, 3070.0], [9.1, 3088.0], [9.2, 3111.0], [9.3, 3133.0], [9.4, 3146.0], [9.5, 3163.0], [9.6, 3862.0], [9.7, 3862.0], [9.8, 3863.0], [9.9, 3864.0], [10.0, 3864.0], [10.1, 3864.0], [10.2, 3867.0], [10.3, 3867.0], [10.4, 3867.0], [10.5, 3867.0], [10.6, 3867.0], [10.7, 3868.0], [10.8, 3869.0], [10.9, 3870.0], [11.0, 3870.0], [11.1, 3870.0], [11.2, 3871.0], [11.3, 3871.0], [11.4, 3876.0], [11.5, 3879.0], [11.6, 3889.0], [11.7, 3892.0], [11.8, 3911.0], [11.9, 4013.0], [12.0, 4014.0], [12.1, 4018.0], [12.2, 4018.0], [12.3, 4018.0], [12.4, 4019.0], [12.5, 4019.0], [12.6, 4021.0], [12.7, 4022.0], [12.8, 4022.0], [12.9, 4024.0], [13.0, 4026.0], [13.1, 4032.0], [13.2, 4042.0], [13.3, 4056.0], [13.4, 4067.0], [13.5, 4080.0], [13.6, 4088.0], [13.7, 4100.0], [13.8, 4118.0], [13.9, 4130.0], [14.0, 4146.0], [14.1, 4158.0], [14.2, 4159.0], [14.3, 4172.0], [14.4, 4182.0], [14.5, 4192.0], [14.6, 4196.0], [14.7, 4197.0], [14.8, 4198.0], [14.9, 4200.0], [15.0, 4201.0], [15.1, 4203.0], [15.2, 4203.0], [15.3, 4317.0], [15.4, 4339.0], [15.5, 4363.0], [15.6, 4381.0], [15.7, 4400.0], [15.8, 4419.0], [15.9, 4444.0], [16.0, 4467.0], [16.1, 4484.0], [16.2, 4505.0], [16.3, 4528.0], [16.4, 4551.0], [16.5, 4573.0], [16.6, 4595.0], [16.7, 4617.0], [16.8, 4637.0], [16.9, 4655.0], [17.0, 5267.0], [17.1, 5267.0], [17.2, 5268.0], [17.3, 5269.0], [17.4, 5270.0], [17.5, 5271.0], [17.6, 5272.0], [17.7, 5275.0], [17.8, 5329.0], [17.9, 5372.0], [18.0, 5393.0], [18.1, 5409.0], [18.2, 5414.0], [18.3, 5427.0], [18.4, 5427.0], [18.5, 5436.0], [18.6, 5448.0], [18.7, 5459.0], [18.8, 5464.0], [18.9, 5466.0], [19.0, 5469.0], [19.1, 5469.0], [19.2, 5475.0], [19.3, 5476.0], [19.4, 5487.0], [19.5, 5493.0], [19.6, 5505.0], [19.7, 5510.0], [19.8, 5512.0], [19.9, 5526.0], [20.0, 5528.0], [20.1, 5530.0], [20.2, 5532.0], [20.3, 5537.0], [20.4, 5543.0], [20.5, 5543.0], [20.6, 5544.0], [20.7, 5544.0], [20.8, 5546.0], [20.9, 5546.0], [21.0, 5546.0], [21.1, 5546.0], [21.2, 5547.0], [21.3, 5548.0], [21.4, 5548.0], [21.5, 5551.0], [21.6, 5552.0], [21.7, 5554.0], [21.8, 5554.0], [21.9, 5554.0], [22.0, 5554.0], [22.1, 5555.0], [22.2, 5556.0], [22.3, 5556.0], [22.4, 5557.0], [22.5, 5557.0], [22.6, 5558.0], [22.7, 5558.0], [22.8, 5559.0], [22.9, 5563.0], [23.0, 5575.0], [23.1, 5592.0], [23.2, 5597.0], [23.3, 5609.0], [23.4, 5614.0], [23.5, 5621.0], [23.6, 5638.0], [23.7, 6131.0], [23.8, 6134.0], [23.9, 6136.0], [24.0, 6137.0], [24.1, 6138.0], [24.2, 6138.0], [24.3, 6145.0], [24.4, 6152.0], [24.5, 6160.0], [24.6, 6167.0], [24.7, 6179.0], [24.8, 6188.0], [24.9, 6201.0], [25.0, 6216.0], [25.1, 6222.0], [25.2, 6226.0], [25.3, 6229.0], [25.4, 6231.0], [25.5, 6233.0], [25.6, 6235.0], [25.7, 6236.0], [25.8, 6237.0], [25.9, 6238.0], [26.0, 6238.0], [26.1, 6238.0], [26.2, 6239.0], [26.3, 6239.0], [26.4, 6240.0], [26.5, 6240.0], [26.6, 6240.0], [26.7, 6241.0], [26.8, 6242.0], [26.9, 6242.0], [27.0, 6243.0], [27.1, 6243.0], [27.2, 6244.0], [27.3, 6247.0], [27.4, 6248.0], [27.5, 6249.0], [27.6, 6261.0], [27.7, 6270.0], [27.8, 6279.0], [27.9, 6287.0], [28.0, 6299.0], [28.1, 6311.0], [28.2, 6312.0], [28.3, 6312.0], [28.4, 6313.0], [28.5, 6313.0], [28.6, 6315.0], [28.7, 6316.0], [28.8, 6316.0], [28.9, 6317.0], [29.0, 6317.0], [29.1, 6317.0], [29.2, 6317.0], [29.3, 6317.0], [29.4, 6317.0], [29.5, 6318.0], [29.6, 6318.0], [29.7, 6318.0], [29.8, 6318.0], [29.9, 6318.0], [30.0, 6319.0], [30.1, 6319.0], [30.2, 6320.0], [30.3, 6321.0], [30.4, 6322.0], [30.5, 6322.0], [30.6, 6322.0], [30.7, 6322.0], [30.8, 6323.0], [30.9, 6324.0], [31.0, 6324.0], [31.1, 6443.0], [31.2, 6443.0], [31.3, 6447.0], [31.4, 6449.0], [31.5, 6451.0], [31.6, 6451.0], [31.7, 6452.0], [31.8, 6452.0], [31.9, 6453.0], [32.0, 6453.0], [32.1, 6453.0], [32.2, 6454.0], [32.3, 6454.0], [32.4, 6454.0], [32.5, 6455.0], [32.6, 6456.0], [32.7, 6457.0], [32.8, 6691.0], [32.9, 6703.0], [33.0, 6716.0], [33.1, 6731.0], [33.2, 6754.0], [33.3, 6774.0], [33.4, 6793.0], [33.5, 6799.0], [33.6, 6800.0], [33.7, 6801.0], [33.8, 6801.0], [33.9, 6802.0], [34.0, 6803.0], [34.1, 6803.0], [34.2, 6804.0], [34.3, 6804.0], [34.4, 6804.0], [34.5, 6804.0], [34.6, 6804.0], [34.7, 6804.0], [34.8, 6805.0], [34.9, 6805.0], [35.0, 6806.0], [35.1, 6806.0], [35.2, 6806.0], [35.3, 6807.0], [35.4, 6807.0], [35.5, 6808.0], [35.6, 6810.0], [35.7, 6817.0], [35.8, 6822.0], [35.9, 6831.0], [36.0, 6840.0], [36.1, 6841.0], [36.2, 6848.0], [36.3, 6851.0], [36.4, 6853.0], [36.5, 6853.0], [36.6, 6855.0], [36.7, 6855.0], [36.8, 6858.0], [36.9, 6860.0], [37.0, 6861.0], [37.1, 6861.0], [37.2, 6861.0], [37.3, 6862.0], [37.4, 6862.0], [37.5, 6862.0], [37.6, 6862.0], [37.7, 6862.0], [37.8, 6863.0], [37.9, 6864.0], [38.0, 6864.0], [38.1, 6864.0], [38.2, 6864.0], [38.3, 6865.0], [38.4, 6866.0], [38.5, 6866.0], [38.6, 6866.0], [38.7, 6866.0], [38.8, 6867.0], [38.9, 6867.0], [39.0, 6867.0], [39.1, 6868.0], [39.2, 6868.0], [39.3, 6869.0], [39.4, 6869.0], [39.5, 6869.0], [39.6, 6869.0], [39.7, 6869.0], [39.8, 6869.0], [39.9, 6870.0], [40.0, 6870.0], [40.1, 6870.0], [40.2, 6871.0], [40.3, 6871.0], [40.4, 6872.0], [40.5, 6872.0], [40.6, 6872.0], [40.7, 6872.0], [40.8, 6873.0], [40.9, 6874.0], [41.0, 6874.0], [41.1, 6874.0], [41.2, 6875.0], [41.3, 6876.0], [41.4, 6876.0], [41.5, 6880.0], [41.6, 6888.0], [41.7, 6907.0], [41.8, 6931.0], [41.9, 6948.0], [42.0, 6950.0], [42.1, 6964.0], [42.2, 6970.0], [42.3, 6985.0], [42.4, 6991.0], [42.5, 7009.0], [42.6, 7031.0], [42.7, 7057.0], [42.8, 7079.0], [42.9, 7104.0], [43.0, 7116.0], [43.1, 7117.0], [43.2, 7117.0], [43.3, 7118.0], [43.4, 7119.0], [43.5, 7119.0], [43.6, 7119.0], [43.7, 7120.0], [43.8, 7121.0], [43.9, 7121.0], [44.0, 7123.0], [44.1, 7124.0], [44.2, 7124.0], [44.3, 7124.0], [44.4, 7125.0], [44.5, 7127.0], [44.6, 7127.0], [44.7, 7133.0], [44.8, 7137.0], [44.9, 7144.0], [45.0, 7149.0], [45.1, 7150.0], [45.2, 7159.0], [45.3, 7166.0], [45.4, 7170.0], [45.5, 7171.0], [45.6, 7172.0], [45.7, 7172.0], [45.8, 7174.0], [45.9, 7175.0], [46.0, 7177.0], [46.1, 7181.0], [46.2, 7188.0], [46.3, 7195.0], [46.4, 7195.0], [46.5, 7195.0], [46.6, 7195.0], [46.7, 7198.0], [46.8, 7198.0], [46.9, 7200.0], [47.0, 7242.0], [47.1, 7255.0], [47.2, 7256.0], [47.3, 7256.0], [47.4, 7256.0], [47.5, 7256.0], [47.6, 7256.0], [47.7, 7258.0], [47.8, 7263.0], [47.9, 7263.0], [48.0, 7264.0], [48.1, 7266.0], [48.2, 7266.0], [48.3, 7267.0], [48.4, 7267.0], [48.5, 7269.0], [48.6, 7274.0], [48.7, 7276.0], [48.8, 7277.0], [48.9, 7277.0], [49.0, 7279.0], [49.1, 7281.0], [49.2, 7282.0], [49.3, 7282.0], [49.4, 7283.0], [49.5, 7284.0], [49.6, 7285.0], [49.7, 7286.0], [49.8, 7286.0], [49.9, 7289.0], [50.0, 7289.0], [50.1, 7290.0], [50.2, 7291.0], [50.3, 7292.0], [50.4, 7292.0], [50.5, 7293.0], [50.6, 7293.0], [50.7, 7294.0], [50.8, 7294.0], [50.9, 7295.0], [51.0, 7295.0], [51.1, 7295.0], [51.2, 7296.0], [51.3, 7301.0], [51.4, 7305.0], [51.5, 7308.0], [51.6, 7310.0], [51.7, 7476.0], [51.8, 7483.0], [51.9, 7486.0], [52.0, 7493.0], [52.1, 7502.0], [52.2, 7521.0], [52.3, 7522.0], [52.4, 7523.0], [52.5, 7523.0], [52.6, 7524.0], [52.7, 7524.0], [52.8, 7525.0], [52.9, 7525.0], [53.0, 7526.0], [53.1, 7526.0], [53.2, 7527.0], [53.3, 7527.0], [53.4, 7527.0], [53.5, 7528.0], [53.6, 7528.0], [53.7, 7528.0], [53.8, 7528.0], [53.9, 7528.0], [54.0, 7529.0], [54.1, 7529.0], [54.2, 7529.0], [54.3, 7529.0], [54.4, 7529.0], [54.5, 7530.0], [54.6, 7530.0], [54.7, 7530.0], [54.8, 7530.0], [54.9, 7531.0], [55.0, 7532.0], [55.1, 7532.0], [55.2, 7533.0], [55.3, 7535.0], [55.4, 7539.0], [55.5, 7541.0], [55.6, 7542.0], [55.7, 7543.0], [55.8, 7546.0], [55.9, 7547.0], [56.0, 7547.0], [56.1, 7549.0], [56.2, 7550.0], [56.3, 7550.0], [56.4, 7554.0], [56.5, 7557.0], [56.6, 7558.0], [56.7, 7559.0], [56.8, 7561.0], [56.9, 7561.0], [57.0, 7561.0], [57.1, 7562.0], [57.2, 7562.0], [57.3, 7563.0], [57.4, 7563.0], [57.5, 7564.0], [57.6, 7564.0], [57.7, 7564.0], [57.8, 7565.0], [57.9, 7565.0], [58.0, 7565.0], [58.1, 7565.0], [58.2, 7565.0], [58.3, 7566.0], [58.4, 7566.0], [58.5, 7566.0], [58.6, 7566.0], [58.7, 7567.0], [58.8, 7567.0], [58.9, 7567.0], [59.0, 7569.0], [59.1, 7570.0], [59.2, 7570.0], [59.3, 7571.0], [59.4, 7571.0], [59.5, 7571.0], [59.6, 7573.0], [59.7, 7574.0], [59.8, 7574.0], [59.9, 7576.0], [60.0, 7577.0], [60.1, 7578.0], [60.2, 7578.0], [60.3, 7580.0], [60.4, 7581.0], [60.5, 7581.0], [60.6, 7582.0], [60.7, 7639.0], [60.8, 7640.0], [60.9, 7642.0], [61.0, 7645.0], [61.1, 7653.0], [61.2, 7658.0], [61.3, 7660.0], [61.4, 7661.0], [61.5, 7661.0], [61.6, 7685.0], [61.7, 7703.0], [61.8, 7707.0], [61.9, 7708.0], [62.0, 7709.0], [62.1, 7710.0], [62.2, 7710.0], [62.3, 7711.0], [62.4, 7711.0], [62.5, 7712.0], [62.6, 7712.0], [62.7, 7712.0], [62.8, 7713.0], [62.9, 7714.0], [63.0, 7714.0], [63.1, 7716.0], [63.2, 7716.0], [63.3, 7718.0], [63.4, 7718.0], [63.5, 7720.0], [63.6, 7726.0], [63.7, 7727.0], [63.8, 7731.0], [63.9, 7737.0], [64.0, 7743.0], [64.1, 7744.0], [64.2, 7744.0], [64.3, 7750.0], [64.4, 7750.0], [64.5, 7751.0], [64.6, 7751.0], [64.7, 7752.0], [64.8, 7752.0], [64.9, 7753.0], [65.0, 7753.0], [65.1, 7753.0], [65.2, 7753.0], [65.3, 7753.0], [65.4, 7755.0], [65.5, 7755.0], [65.6, 7755.0], [65.7, 7756.0], [65.8, 7756.0], [65.9, 7756.0], [66.0, 7757.0], [66.1, 7757.0], [66.2, 7757.0], [66.3, 7758.0], [66.4, 7758.0], [66.5, 7758.0], [66.6, 7759.0], [66.7, 7759.0], [66.8, 7759.0], [66.9, 7760.0], [67.0, 7760.0], [67.1, 7760.0], [67.2, 7761.0], [67.3, 7761.0], [67.4, 7761.0], [67.5, 7761.0], [67.6, 7761.0], [67.7, 7761.0], [67.8, 7761.0], [67.9, 7761.0], [68.0, 7762.0], [68.1, 7762.0], [68.2, 7763.0], [68.3, 7763.0], [68.4, 7764.0], [68.5, 7764.0], [68.6, 7764.0], [68.7, 7764.0], [68.8, 7765.0], [68.9, 7765.0], [69.0, 7766.0], [69.1, 7766.0], [69.2, 7767.0], [69.3, 7767.0], [69.4, 7767.0], [69.5, 7767.0], [69.6, 7768.0], [69.7, 7768.0], [69.8, 7768.0], [69.9, 7768.0], [70.0, 7769.0], [70.1, 7769.0], [70.2, 7769.0], [70.3, 7769.0], [70.4, 7769.0], [70.5, 7769.0], [70.6, 7770.0], [70.7, 7770.0], [70.8, 7771.0], [70.9, 7771.0], [71.0, 7771.0], [71.1, 7771.0], [71.2, 7771.0], [71.3, 7772.0], [71.4, 7772.0], [71.5, 7773.0], [71.6, 7774.0], [71.7, 7779.0], [71.8, 7784.0], [71.9, 7784.0], [72.0, 7784.0], [72.1, 7787.0], [72.2, 7788.0], [72.3, 7788.0], [72.4, 7788.0], [72.5, 7788.0], [72.6, 7789.0], [72.7, 7790.0], [72.8, 7794.0], [72.9, 7794.0], [73.0, 7796.0], [73.1, 7797.0], [73.2, 7798.0], [73.3, 7798.0], [73.4, 7798.0], [73.5, 7799.0], [73.6, 7800.0], [73.7, 7801.0], [73.8, 7802.0], [73.9, 7803.0], [74.0, 7804.0], [74.1, 7804.0], [74.2, 7805.0], [74.3, 7808.0], [74.4, 7813.0], [74.5, 7815.0], [74.6, 7815.0], [74.7, 7818.0], [74.8, 7819.0], [74.9, 7819.0], [75.0, 7820.0], [75.1, 7820.0], [75.2, 7821.0], [75.3, 7821.0], [75.4, 7821.0], [75.5, 7821.0], [75.6, 7822.0], [75.7, 7822.0], [75.8, 7823.0], [75.9, 7823.0], [76.0, 7823.0], [76.1, 7823.0], [76.2, 7824.0], [76.3, 7825.0], [76.4, 7825.0], [76.5, 7825.0], [76.6, 7826.0], [76.7, 7827.0], [76.8, 7827.0], [76.9, 7827.0], [77.0, 7828.0], [77.1, 7828.0], [77.2, 7828.0], [77.3, 7829.0], [77.4, 7829.0], [77.5, 7829.0], [77.6, 7829.0], [77.7, 7829.0], [77.8, 7829.0], [77.9, 7829.0], [78.0, 7830.0], [78.1, 7830.0], [78.2, 7830.0], [78.3, 7830.0], [78.4, 7831.0], [78.5, 7831.0], [78.6, 7831.0], [78.7, 7832.0], [78.8, 7835.0], [78.9, 7835.0], [79.0, 7837.0], [79.1, 7839.0], [79.2, 7841.0], [79.3, 7843.0], [79.4, 7843.0], [79.5, 7843.0], [79.6, 7844.0], [79.7, 7848.0], [79.8, 7848.0], [79.9, 7854.0], [80.0, 7855.0], [80.1, 7856.0], [80.2, 7858.0], [80.3, 7859.0], [80.4, 7860.0], [80.5, 7862.0], [80.6, 7862.0], [80.7, 7863.0], [80.8, 7863.0], [80.9, 7864.0], [81.0, 7864.0], [81.1, 7865.0], [81.2, 7865.0], [81.3, 7865.0], [81.4, 7866.0], [81.5, 7866.0], [81.6, 7866.0], [81.7, 7866.0], [81.8, 7867.0], [81.9, 7867.0], [82.0, 7867.0], [82.1, 7867.0], [82.2, 7867.0], [82.3, 7868.0], [82.4, 7869.0], [82.5, 7870.0], [82.6, 7870.0], [82.7, 7871.0], [82.8, 7872.0], [82.9, 7872.0], [83.0, 7873.0], [83.1, 7873.0], [83.2, 7873.0], [83.3, 7873.0], [83.4, 7873.0], [83.5, 7873.0], [83.6, 7874.0], [83.7, 7874.0], [83.8, 7874.0], [83.9, 7874.0], [84.0, 7874.0], [84.1, 7875.0], [84.2, 7875.0], [84.3, 7875.0], [84.4, 7875.0], [84.5, 7875.0], [84.6, 7875.0], [84.7, 7875.0], [84.8, 7876.0], [84.9, 7876.0], [85.0, 7876.0], [85.1, 7876.0], [85.2, 7877.0], [85.3, 7877.0], [85.4, 7877.0], [85.5, 7877.0], [85.6, 7877.0], [85.7, 7877.0], [85.8, 7878.0], [85.9, 7878.0], [86.0, 7879.0], [86.1, 7879.0], [86.2, 7879.0], [86.3, 7880.0], [86.4, 7880.0], [86.5, 7880.0], [86.6, 7881.0], [86.7, 7881.0], [86.8, 7881.0], [86.9, 7882.0], [87.0, 7883.0], [87.1, 7883.0], [87.2, 7884.0], [87.3, 7884.0], [87.4, 7885.0], [87.5, 7885.0], [87.6, 7885.0], [87.7, 7885.0], [87.8, 7885.0], [87.9, 7886.0], [88.0, 7886.0], [88.1, 7886.0], [88.2, 7887.0], [88.3, 7887.0], [88.4, 7887.0], [88.5, 7887.0], [88.6, 7887.0], [88.7, 7888.0], [88.8, 7888.0], [88.9, 7888.0], [89.0, 7889.0], [89.1, 7889.0], [89.2, 7889.0], [89.3, 7889.0], [89.4, 7889.0], [89.5, 7889.0], [89.6, 7889.0], [89.7, 7890.0], [89.8, 7890.0], [89.9, 7890.0], [90.0, 7890.0], [90.1, 7891.0], [90.2, 7892.0], [90.3, 7892.0], [90.4, 7892.0], [90.5, 7895.0], [90.6, 7895.0], [90.7, 7897.0], [90.8, 7898.0], [90.9, 7898.0], [91.0, 7899.0], [91.1, 7900.0], [91.2, 7902.0], [91.3, 7902.0], [91.4, 7903.0], [91.5, 7904.0], [91.6, 7905.0], [91.7, 7905.0], [91.8, 7907.0], [91.9, 7908.0], [92.0, 7908.0], [92.1, 7910.0], [92.2, 7912.0], [92.3, 7914.0], [92.4, 7914.0], [92.5, 7915.0], [92.6, 7916.0], [92.7, 7917.0], [92.8, 7918.0], [92.9, 7919.0], [93.0, 7919.0], [93.1, 7921.0], [93.2, 7921.0], [93.3, 7921.0], [93.4, 7926.0], [93.5, 7928.0], [93.6, 7928.0], [93.7, 7928.0], [93.8, 7929.0], [93.9, 7929.0], [94.0, 7931.0], [94.1, 7933.0], [94.2, 7933.0], [94.3, 7934.0], [94.4, 7935.0], [94.5, 7935.0], [94.6, 7936.0], [94.7, 7937.0], [94.8, 7937.0], [94.9, 7937.0], [95.0, 7937.0], [95.1, 7938.0], [95.2, 7938.0], [95.3, 7939.0], [95.4, 7939.0], [95.5, 7939.0], [95.6, 7940.0], [95.7, 7941.0], [95.8, 7942.0], [95.9, 7943.0], [96.0, 7944.0], [96.1, 7945.0], [96.2, 7947.0], [96.3, 7948.0], [96.4, 7949.0], [96.5, 7951.0], [96.6, 7951.0], [96.7, 7951.0], [96.8, 7951.0], [96.9, 7953.0], [97.0, 7955.0], [97.1, 7964.0], [97.2, 7966.0], [97.3, 7966.0], [97.4, 7968.0], [97.5, 7970.0], [97.6, 7972.0], [97.7, 7973.0], [97.8, 10200.0], [97.9, 10220.0], [98.0, 10245.0], [98.1, 10264.0], [98.2, 10287.0], [98.3, 10312.0], [98.4, 10355.0], [98.5, 10374.0], [98.6, 10397.0], [98.7, 10420.0], [98.8, 10443.0], [98.9, 10471.0], [99.0, 10494.0], [99.1, 10516.0], [99.2, 10539.0], [99.3, 10563.0], [99.4, 10586.0], [99.5, 10607.0], [99.6, 10630.0], [99.7, 10646.0], [99.8, 10668.0], [99.9, 10688.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 200.0, "maxY": 175.0, "series": [{"data": [[600.0, 2.0], [700.0, 5.0], [800.0, 1.0], [900.0, 3.0], [1100.0, 3.0], [1200.0, 7.0], [1300.0, 4.0], [1700.0, 6.0], [1800.0, 9.0], [1900.0, 3.0], [2000.0, 4.0], [2600.0, 1.0], [2700.0, 21.0], [2900.0, 3.0], [3000.0, 5.0], [3100.0, 4.0], [3800.0, 22.0], [3900.0, 1.0], [4000.0, 18.0], [4300.0, 4.0], [4100.0, 12.0], [4200.0, 4.0], [4600.0, 3.0], [4500.0, 5.0], [4400.0, 5.0], [5300.0, 3.0], [5200.0, 8.0], [5400.0, 14.0], [5500.0, 37.0], [5600.0, 4.0], [6100.0, 12.0], [6300.0, 30.0], [6200.0, 32.0], [6600.0, 1.0], [6400.0, 17.0], [6900.0, 8.0], [6800.0, 81.0], [6700.0, 7.0], [7100.0, 40.0], [7000.0, 4.0], [7400.0, 4.0], [7300.0, 4.0], [7200.0, 44.0], [7600.0, 10.0], [7500.0, 86.0], [7900.0, 67.0], [7800.0, 175.0], [7700.0, 119.0], [10200.0, 5.0], [10600.0, 5.0], [10500.0, 4.0], [10400.0, 4.0], [10300.0, 5.0], [200.0, 7.0], [400.0, 2.0], [500.0, 6.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 10600.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 9.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 960.0, "series": [{"data": [[0.0, 9.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 31.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 960.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 81.02883156297415, "minX": 1.77826404E12, "maxY": 82.5043988269794, "series": [{"data": [[1.77826404E12, 82.5043988269794], [1.7782641E12, 81.02883156297415]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7782641E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 1451.0, "minX": 1.0, "maxY": 8451.04255319149, "series": [{"data": [[2.0, 3867.0], [3.0, 2045.0], [4.0, 2072.0], [5.0, 2065.0], [6.0, 2060.0], [7.0, 2058.5], [8.0, 1451.0], [9.0, 2212.5], [10.0, 2204.0], [11.0, 2134.0], [12.0, 1655.0], [13.0, 2270.5], [14.0, 2217.5], [15.0, 2221.0], [16.0, 2220.0], [17.0, 1805.6666666666667], [18.0, 2412.5], [19.0, 2406.5], [20.0, 1826.3333333333333], [21.0, 2344.0], [22.0, 2342.5], [23.0, 2351.0], [24.0, 2486.666666666667], [25.0, 3324.5], [26.0, 3308.0], [27.0, 3301.5], [28.0, 2584.0], [29.0, 3227.0], [30.0, 3227.5], [31.0, 3260.5], [32.0, 3292.0], [33.0, 3309.0], [34.0, 3322.5], [35.0, 2639.0], [36.0, 3743.0], [37.0, 3740.0], [38.0, 3728.5], [39.0, 3147.0], [40.0, 3714.0], [41.0, 3707.0], [42.0, 3646.0], [43.0, 3040.666666666667], [44.0, 3664.5], [45.0, 3675.5], [46.0, 3687.5], [47.0, 3069.333333333333], [48.0, 3692.5], [49.0, 5395.080000000001], [50.0, 4103.5], [51.0, 3324.666666666667], [52.0, 4111.0], [53.0, 4118.0], [54.0, 4808.0], [55.0, 4797.5], [56.0, 4788.0], [57.0, 4214.0], [58.0, 4758.5], [59.0, 4752.5], [60.0, 4741.5], [61.0, 4147.333333333333], [62.0, 4707.0], [63.0, 4696.0], [64.0, 3980.333333333333], [65.0, 4597.5], [66.0, 6219.098039215685], [67.0, 4801.0], [68.0, 4112.0], [69.0, 4797.0], [70.0, 4795.5], [71.0, 4101.666666666667], [72.0, 4793.5], [73.0, 4792.0], [74.0, 4793.5], [75.0, 4100.666666666667], [76.0, 4797.0], [77.0, 4794.0], [78.0, 6782.955882352941], [79.0, 4209.0], [80.0, 4945.0], [81.0, 5925.0], [82.0, 5890.5], [83.0, 5443.0], [84.0, 5847.0], [85.0, 7193.65], [86.0, 6034.5], [87.0, 5512.0], [88.0, 6008.0], [89.0, 5995.5], [90.0, 7533.443181818183], [91.0, 6151.0], [92.0, 6140.5], [93.0, 7772.489130434783], [94.0, 5331.333333333333], [95.0, 7292.299999999999], [96.0, 7707.747126436782], [97.0, 7818.673267326733], [98.0, 6638.5], [99.0, 8451.04255319149], [100.0, 5868.776699029125], [1.0, 3869.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[81.532, 6563.944000000004]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 937.75, "minX": 1.77826404E12, "maxY": 66503.63333333333, "series": [{"data": [[1.77826404E12, 937.75], [1.7782641E12, 1812.25]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.77826404E12, 34407.183333333334], [1.7782641E12, 66503.63333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7782641E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 5474.744868035191, "minX": 1.77826404E12, "maxY": 7127.550834597879, "series": [{"data": [[1.77826404E12, 5474.744868035191], [1.7782641E12, 7127.550834597879]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7782641E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 5474.715542521993, "minX": 1.77826404E12, "maxY": 7127.523520485588, "series": [{"data": [[1.77826404E12, 5474.715542521993], [1.7782641E12, 7127.523520485588]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7782641E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.08649468892261004, "minX": 1.77826404E12, "maxY": 0.35777126099706746, "series": [{"data": [[1.77826404E12, 0.35777126099706746], [1.7782641E12, 0.08649468892261004]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7782641E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 219.0, "minX": 1.77826404E12, "maxY": 10688.0, "series": [{"data": [[1.77826404E12, 10688.0], [1.7782641E12, 7973.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.77826404E12, 7939.0], [1.7782641E12, 7880.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.77826404E12, 10639.279999999999], [1.7782641E12, 7964.8]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.77826404E12, 10317.4], [1.7782641E12, 7914.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.77826404E12, 219.0], [1.7782641E12, 3862.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.77826404E12, 6312.0], [1.7782641E12, 7539.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7782641E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 250.0, "minX": 3.0, "maxY": 7561.0, "series": [{"data": [[9.0, 7561.0], [5.0, 250.0], [11.0, 5611.5], [12.0, 7479.5], [3.0, 3869.0], [13.0, 7301.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 13.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 250.0, "minX": 3.0, "maxY": 7561.0, "series": [{"data": [[9.0, 7561.0], [5.0, 250.0], [11.0, 5611.5], [12.0, 7479.5], [3.0, 3869.0], [13.0, 7301.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 13.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 7.3, "minX": 1.77826404E12, "maxY": 9.366666666666667, "series": [{"data": [[1.77826404E12, 7.3], [1.7782641E12, 9.366666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7782641E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 5.683333333333334, "minX": 1.77826404E12, "maxY": 10.983333333333333, "series": [{"data": [[1.77826404E12, 5.683333333333334], [1.7782641E12, 10.983333333333333]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7782641E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 5.683333333333334, "minX": 1.77826404E12, "maxY": 10.983333333333333, "series": [{"data": [[1.77826404E12, 5.683333333333334], [1.7782641E12, 10.983333333333333]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7782641E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 5.683333333333334, "minX": 1.77826404E12, "maxY": 10.983333333333333, "series": [{"data": [[1.77826404E12, 5.683333333333334], [1.7782641E12, 10.983333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7782641E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

