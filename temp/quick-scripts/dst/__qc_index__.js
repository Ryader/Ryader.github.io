
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/Block');
require('./assets/Script/BoosterService');
require('./assets/Script/BoosterType');
require('./assets/Script/GameRules');
require('./assets/Script/GameSession');
require('./assets/Script/GameStartSystem');
require('./assets/Script/GridGenerator');
require('./assets/Script/IBlockClickHandler');
require('./assets/Script/IGridAccess');
require('./assets/Script/MatchFinder');
require('./assets/Script/PlayabilityService');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();