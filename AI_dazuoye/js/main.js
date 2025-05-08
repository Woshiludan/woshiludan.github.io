let analyzeClickCount = 0;

document.addEventListener('DOMContentLoaded', function () {
    // 显示弹窗
    function showModal(id) {
        document.getElementById('modal-mask').style.display = 'block';
        document.getElementById(id).style.display = 'block';
    }
    // 隐藏所有弹窗
    function hideAllModals() {
        document.getElementById('modal-mask').style.display = 'none';
        var modals = document.querySelectorAll('.modal-dialog');
        modals.forEach(function (m) {
            m.style.display = 'none';
        });
    }
    // 关闭/取消按钮
    [
      'modalCloseBtn1','modalCancelBtn1','modalCloseBtn2','modalCancelBtn2',
      'modalCloseBtn3','modalCancelBtn3','modalCloseBtn4','modalCancelBtn4',
      'modalCloseBtnTip','modalTipOkBtn','modalReportBtnHealthy'
    ].forEach(function (id) {
        var btn = document.getElementById(id);
        if (btn) btn.onclick = hideAllModals;
    });
    // 打开弹窗1
    var btnUpload = document.getElementById('btnUpload');
    if (btnUpload) {
        btnUpload.onclick = function () {
            showModal('modal-upload');
        };
    }
    // 首页"开始分析"按钮弹窗提示（不影响计数）
    var btnAnalyze = document.getElementById('btnAnalyze');
    if (btnAnalyze) {
        btnAnalyze.onclick = function () {
            showModal('modal-tip');
        };
    }
    // 浏览本地文件
    var modalFileInput = document.getElementById('modalFileInput');
    var modalUploadBtnLabel = document.querySelector('.modal-upload-btn');
    if (modalUploadBtnLabel && modalFileInput) {
        modalUploadBtnLabel.onclick = function () {
            modalFileInput.click();
        };
        modalFileInput.onchange = function () {
            hideAllModals();
            showModal('modal-upload-success');
        };
    }
    // 弹窗1"生成"按钮：如果没选文件，仍可手动跳转
    var modalUploadBtn = document.getElementById('modalUploadBtn');
    if (modalUploadBtn) {
        modalUploadBtn.onclick = function () {
            hideAllModals();
            showModal('modal-upload-success');
        };
    }
    // 弹窗2"开始分析"按钮，单数次弹患病，双数次弹健康，计数器不重置
    var modalAnalyzeBtn = document.getElementById('modalAnalyzeBtn');
    if (modalAnalyzeBtn) {
        modalAnalyzeBtn.onclick = function () {
            modalAnalyzeBtn.disabled = true;
            modalAnalyzeBtn.textContent = '分析中...';
            setTimeout(function () {
                hideAllModals();
                analyzeClickCount++;
                if (analyzeClickCount % 2 === 1) {
                    showModal('modal-result-healthy'); // 单数次弹患病
                } else {
                    showModal('modal-result'); // 双数次弹健康
                }
                modalAnalyzeBtn.disabled = false;
                modalAnalyzeBtn.textContent = '开始分析';
            }, 2000);
        };
    }
    // 弹窗3"生成辅助报告"按钮
    var modalReportBtn = document.getElementById('modalReportBtn');
    if (modalReportBtn) {
        modalReportBtn.onclick = function () {
            hideAllModals();
            modalReportBtn.disabled = true;
            modalReportBtn.textContent = '生成中...';
            setTimeout(function () {
                window.location.href = 'fenxi.html';
            }, 2000);
        };
    }
});