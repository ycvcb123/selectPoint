//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        
    },
    showModal: function() {
        var mask = this.selectComponent("#componentMask");
        mask.showModal();
    }
})
