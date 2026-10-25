const addFriendBtn = document.getElementById("addFriend");
const result = document.getElementById("result");

addFriendBtn.addEventListener("click", async () => {
    const srcUin = document.getElementById("srcUin").value.trim();
    const desUin = document.getElementById("desUin").value.trim();

    if (!srcUin || !desUin) {
        showResult("Kaynak UID ve hedef UID gerekli.", false);
        return;
    }

    addFriendBtn.disabled = true;
    addFriendBtn.textContent = "GÖNDERİLİYOR...";

    try {
        const url =
            "/api/v1/toolbox/friend?" +
            new URLSearchParams({
                des_uin: desUin,
                src_uin: srcUin
            });

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        const text = await response.text();

        let data;

        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }

        console.log("HTTP:", response.status);
        console.log("Response:", data);

        if (!response.ok) {
            showResult(
                "BAŞARISIZ\n\n" +
                "HTTP: " + response.status +
                "\n\nSunucu cevabı:\n" +
                (typeof data === "string"
                    ? data
                    : JSON.stringify(data, null, 2)),
                false
            );
            return;
        }

        showResult(
            "BAŞARILI\n\n" +
            (typeof data === "string"
                ? data
                : JSON.stringify(data, null, 2)),
            true
        );

    } catch (error) {
        console.error(error);

        showResult(
            "İSTEK HATASI\n\n" + error.message,
            false
        );
    } finally {
        addFriendBtn.disabled = false;
        addFriendBtn.textContent = "ARKADAŞ EKLE";
    }
});

function showResult(message, success) {
    result.textContent = message;
    result.className = success ? "success" : "error";
    result.style.display = "block";
}