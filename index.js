const express = require('express');
const path = require('path');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const util = require('util');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const upload = multer({ dest: 'uploads/' });
const sumatraPDFPath = path.join(__dirname, 'SumatraPDF.exe');
const unlinkFile = util.promisify(fs.unlink);

app.post('/upload-print', upload.single('pdf'), async (req, res) => {
    const printer = req.body.printer || 'EPSON L210 Series on 192.168.60.32';
    const paperSize = req.body.paperSize || 'A4';
    const orientation = req.body.orientation || 'portrait';
    const filePath = req.file.path;

    const sumatraCommand = `"${sumatraPDFPath}" -silent -print-to "${printer}" -print-settings "${orientation},paper=${paperSize}" "${filePath}"`;

    exec(sumatraCommand, async (err) => {
        try {
            console.log(filePath)
            await unlinkFile(filePath);
            if (err) {
                return res.status(500).json({ message: `Print failed: ${err.message}` });
            }
            res.status(200).json({ message: 'Print Success' });
        } catch (unlinkErr) {
            res.status(500).json({ message: `Failed to delete file: ${unlinkErr.message}` });
        }
    });
});

const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
