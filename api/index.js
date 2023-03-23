const express = require('express');
const cors = require('cors');
const myParser = require("body-parser");
const db = require('./db');
const app = express();
const port = 5000;
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

app.use(cors());
app.use(express.json({ limit: '200mb' }));
const client = new TextToSpeechClient({
    projectId: 'august-apricot-354402',
    credentials: {
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCv8yZ94NUkcYup\nSpXENXETyXbfTKHQy8hybmMRJtA3pzCJ1w858Qg315kjm+VrAaFj8X0v96OvzUQV\n6Y8P2Ynxf6qryxnkZUaNhYsVgyhl5xtOWpn2ki4rOW/WYQcxlB1NvLNMiuZDTVKI\nXyi524jczZ2toNDla/38MbvGUcysKbgoqQknZaxwh2CgLRhIkW0MC+7cv0Ej0PUn\nmdzF6JdFy9ctYr1ADpou0D+iKOs+X4fnYrwgwkCKsAfNJ6SaAimdbo3MS3MhB9HF\nALSi6J0DaxPfLoUjz9najZqAK8zlSmP6v4HGksGcLVhPGiM0env01d9Xpk29cnsQ\nts6eeOtFAgMBAAECggEAAoWeU+U0d3FZkE25GutQ0MptR06jnPGKc7RZh7YKzRRS\nIbHWzk4Trlnz8bOJhjIfsivaZoIQob9Fi2EK0i4n9qXqoPp5pHE/inSqkQ0Bw4CF\nViFbOwyIzFTmVe4IGqMuwuOrEj/iVfL8OzkUInOq1VpJ3AWFzVzDW3rcGj/huQzl\nNGA/pUazj61Q9ZagbnULClnjjLN8z4vOGYR6PNLz//b+9UEGySfDcGuqV5sDj5fP\nO79BW0vJDy0ppUWUBOVQxcaO1Iq5uccRuenImWItIJB6WJemKu0Xc1EBJxJRzJDF\nwtdJjSfbXEqHfa3AIFJgWzUo+OUOeWnhu8hwQcBeIQKBgQDlUVMb30VAUaSkPXbQ\nseoNDYv06ty9StWzQxm8SGUzy4EpQVeyqs8sBlVdXnnXbtyDHjhnYEuFhoIXisdV\nK31pKyJh7gmhHlMbssqWvI1X/oA1M19KMnEKLAevdfzsckBfnSYoRtSlCCBYDHsy\nLHyJ2F4tJ3ua3u34f7mnlSO4XQKBgQDEbCjOROK6NRe6xsRlXrTXQKscpHpFYXKe\n6Lp25cnr4urrl9ym1sB4Sl5VWD/K1NyA9HzNs6QlNlzWJuOpjs7rW1C8/2c7Y+E3\n6/GZInjo86IORP6dqb/gSyzfcvn+HJE5akVHvQxu8IqFXoBSv7XQeyQICxh2fQFc\nVLBwMd4wCQKBgH+1ZMV2+Egzr69QE6VyD9ipHLKPQdOho5Wr3t8+qi3IPexN2ZtF\nCQ+Jj2zqOozBzsiuwdbAiA6atESMIyrJh5RUU1eai35RNxOL5MtBwq2orJn0PDNE\nGDQEBVuwJ+U+U59sE14G5FHsTqb6fHma0NiryPb4sBu1322vJCOyKSx5AoGAKcxC\nWrJ59Nn7dLl7bX7byLpwLyYpBr6X34zysP5xG4ssJnoocDBewLpCnLKs0IK/cYmV\nTUie83RACSo5ZAmJqrfB1JYc55x3fqjsvoOBa0D9CUBRVkebFyWoJNyYqiR2Gtus\nZnmqPaleMMdNU06MaBLsNfH2gLBVK8qxyQ4zk9ECgYEAxV08c9miesl04LB3fZtH\nnVHSYjyjobK/QPvQ85R018K8soLKWNGehgTDFX/4wuB6WotLxJETAqXTrhLaFn1Z\ndFE7PwhquNw81IcsiQrwd5xd7DTbe7r5q4oWfn2/l29dV0iym7G9TD4b+gU5iS74\nDyeo6QbRZKMW80UpWlIU9IQ=\n-----END PRIVATE KEY-----\n',
        client_email: 'demo-853@august-apricot-354402.iam.gserviceaccount.com'
    }
});


app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.get('/books', (req, res) => {
    db.getAllBooks(req.query.limit, req.query.offset, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });

});



app.get('/books/:id', (req, res) => {
    db.getBookById(req.params.id, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
});
app.get('/search', (req, res) => {
    db.searchBooks(req.query.query, req.query.limit, req.query.offset, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });

});

app.get('/subjects', (req, res) => {
    db.getAllSubjects((err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });

});

app.get('/bysubject', (req, res) => {

    db.getBooksBySubject(req.query.subject, req.query.limit, req.query.offset, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });

});

app.get('/gettext/:id', (req, res) => {
    db.getBookText(req.params.id, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
});

app.post('/text-to-speech', async (req, res) => {

    try {
        const char_limit = 2904;
        console.log(req.body.text.length);
        if (req.body.text.length > char_limit) {
            textParts = req.body.text.match(new RegExp('.{1,' + char_limit + '}', 'g'));
            let audioContent = '';
            for (let i = 0; i < textParts.length; i++) {
                const request = {
                    input: { text: textParts[i] },
                    voice: { languageCode: req.body.language, ssmlGender: req.body.gender },
                    audioConfig: { audioEncoding: 'MP3', speakingRate: req.body.speed },
                };

                const [response] = await client.synthesizeSpeech(request);
                audioContent += response.audioContent;
                console.log('done');
            }
            res.send(audioContent);
            console.log('done');
        } else {

            const request = {
                input: { text: req.body.text },
                voice: { languageCode: req.body.language, ssmlGender: req.body.gender },
                audioConfig: { audioEncoding: 'MP3', speakingRate: req.body.speed },
            };

            const [response] = await client.synthesizeSpeech(request);
            res.send(response.audioContent);
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }

});

app.get('/text-to-speech/:id', async (req, res) => {

    db.getBookText(req.params.id, async (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        } else {
            try {
                const char_limit = 2904;
                if (result.length > char_limit) {
                    textParts = result.match(new RegExp('.{1,' + char_limit + '}', 'g'));
                    let audioContent = '';
                    for (let i = 0; i < textParts.length; i++) {
                        const request = {
                            input: { text: textParts[i] },
                            voice: { languageCode: req.query.language, ssmlGender: req.query.gender },
                            audioConfig: { audioEncoding: 'MP3', speakingRate: req.query.speed },
                        };

                        const [response] = await client.synthesizeSpeech(request);
                        audioContent += response.audioContent;
                    }
                    res.send(audioContent);
                } else {

                    const request = {
                        input: { text: req.query.text },
                        voice: { languageCode: req.query.language, ssmlGender: req.query.gender },
                        audioConfig: { audioEncoding: 'MP3', speakingRate: req.query.speed },
                    };

                    const [response] = await client.synthesizeSpeech(request);
                    res.send(response.audioContent);
                }



            } catch (error) {
                console.log(error.message);
                res.status(500).send(error.message);
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});