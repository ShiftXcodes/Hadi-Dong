document.getElementById("useName").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    if (username) {
        alert(`Halo, ${username}! Verifikasi berhasil.`);
    } else {
        alert("Nama kosong. Silakan masukkan nama atau pilih lanjut tanpa nama.");
    }
});

document.getElementById("skipName").addEventListener("click", () => {
    alert("Anda telah memilih untuk lanjut tanpa nama. Verifikasi berhasil.");
});