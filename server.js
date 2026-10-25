const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const friends = [];

app.get("/api/v1/toolbox/friend", (req, res) => {
    const { src_uin, des_uin } = req.query;

    if (!src_uin || !des_uin) {
        return res.status(400).json({
            success: false,
            message: "src_uin ve des_uin gerekli."
        });
    }

    if (src_uin === des_uin) {
        return res.status(400).json({
            success: false,
            message: "Kendine arkadaşlık isteği gönderemezsin."
        });
    }

    friends.push({
        src_uin,
        des_uin,
        created_at: new Date().toISOString()
    });

    res.json({
        success: true,
        message: "Arkadaşlık isteği oluşturuldu.",
        src_uin,
        des_uin
    });
});

app.listen(PORT, () => {
    console.log(`Friend Manager çalışıyor: http://localhost:${PORT}`);
});