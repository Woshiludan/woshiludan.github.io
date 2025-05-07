document.addEventListener('DOMContentLoaded', function() {
    // 弹窗交互逻辑
    function showModal(id) {
        document.getElementById('modal-mask').style.display = 'block';
        document.getElementById(id).style.display = 'block';
    }
    function hideAllModals() {
        document.getElementById('modal-mask').style.display = 'none';
        document.getElementById('modal-upload').style.display = 'none';
        document.getElementById('modal-upload-success').style.display = 'none';
        document.getElementById('modal-result').style.display = 'none';
        document.getElementById('modal-tip').style.display = 'none';
    }
    // 打开弹窗1
    const btnUpload = document.getElementById('btnUpload');
    if (btnUpload) {
        btnUpload.addEventListener('click', function(e) {
            showModal('modal-upload');
        });
    }
    // 开始分析按钮弹窗提示
    const btnAnalyze = document.getElementById('btnAnalyze');
    if (btnAnalyze) {
        btnAnalyze.addEventListener('click', function(e) {
            showModal('modal-tip');
        });
    }
    // 关闭/取消按钮
    ['modalCloseBtn1','modalCancelBtn1','modalCloseBtn2','modalCancelBtn2','modalCloseBtn3','modalCancelBtn3','modalCloseBtnTip','modalTipOkBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.onclick = hideAllModals;
    });
    // 浏览本地文件
    const modalFileInput = document.getElementById('modalFileInput');
    const modalUploadBtnLabel = document.querySelector('.modal-upload-btn');
    if (modalUploadBtnLabel && modalFileInput) {
        modalUploadBtnLabel.onclick = function() {
            modalFileInput.click();
        };
        // 文件选择后立即跳转到弹窗2
        modalFileInput.onchange = function() {
            hideAllModals();
            showModal('modal-upload-success');
        };
    }
    // 弹窗1"生成"按钮：如果没选文件，仍可手动跳转
    const modalUploadBtn = document.getElementById('modalUploadBtn');
    if (modalUploadBtn) {
        modalUploadBtn.onclick = function() {
            hideAllModals();
            showModal('modal-upload-success');
        };
    }
    // 弹窗2：点击"开始分析"进入弹窗3，增加2秒等待
    const modalAnalyzeBtn = document.getElementById('modalAnalyzeBtn');
    if (modalAnalyzeBtn) {
        modalAnalyzeBtn.onclick = function() {
            hideAllModals();
            // 显示loading遮罩或按钮禁用（可选）
            showModal('modal-upload-success');
            modalAnalyzeBtn.disabled = true;
            modalAnalyzeBtn.textContent = '分析中...';
            setTimeout(function() {
                hideAllModals();
                showModal('modal-result');
                modalAnalyzeBtn.disabled = false;
                modalAnalyzeBtn.textContent = '开始分析';
            }, 2000);
        };
    }
    // 弹窗3：点击"生成辅助报告"跳转到fenxi.html
    const modalReportBtn = document.getElementById('modalReportBtn');
    if (modalReportBtn) {
        modalReportBtn.onclick = function() {
            window.location.href = 'fenxi.html';
        };
    }
}); 