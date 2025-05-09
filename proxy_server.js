import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 代理玩家基本信息
app.post('/proxy/player', async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: '缺少 API Token' });

    try {
        const response = await fetch('https://maimai.lxns.net/api/v0/user/maimai/player', {
            headers: { 'X-User-Token': token }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("代理服务器错误:", error);
        res.status(500).json({ error: '代理服务器出错', message: error.message });
    }
});

// 代理玩家成绩信息
app.post('/proxy/player/scores', async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: '缺少 API Token' });

    try {
        const response = await fetch('https://maimai.lxns.net/api/v0/user/maimai/player/scores', {
            headers: { 'X-User-Token': token }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("代理服务器错误:", error);
        res.status(500).json({ error: '代理服务器出错', message: error.message });
    }
});

// 代理歌曲信息（按 song_id）
app.get('/proxy/song/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`https://maimai.lxns.net/api/v0/maimai/song/${id}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("歌曲信息代理失败:", error);
        res.status(500).json({ error: '代理服务器出错', message: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`代理服务器已启动: http://localhost:${PORT}`);
});
