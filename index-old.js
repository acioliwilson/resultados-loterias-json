require('dotenv').config();

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

const allowedOrigins = '*';
app.use(cors({
    origin: allowedOrigins,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-api-key']
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-api-key');
    next();
});

const URL = 'https://www.megaloterias.com.br/resultados';

// app.use((req, res, next) => {
//     const userApiKey = req.headers['x-api-key'];
//     const apiKey = process.env.API_KEY;

//     if (!userApiKey || userApiKey !== apiKey) {
//         return res.status(401).json({
//             status: 'error',
//             code: 401,
//             message: 'Unauthorized',
//             details: 'Invalid API key. Please provide a valid API key in the "x-api-key" header.'
//         });
//     }
    
//     next();
// });

app.get('/api/resultados', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);

        const resultadoInfo = {
            duplasena: {}  // Inicializa o objeto da Dupla Sena
        };

    //     // Dupla Sena
    //     var DStodasDezenas = $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) });
    //     var DSpremiacoes = [];

    //     $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').each(function() {
    //         const premiacao = {
    //             categoria: $(this).find('td:nth-child(1)').text().trim(),
    //             ganhadores: $(this).find('td:nth-child(2)').text().trim(),
    //             premio: $(this).find('td:nth-child(3)').text().trim(),
    //         };

    //         // Verificando se a categoria pertence ao primeiro ou segundo sorteio
    //         if (premiacao.categoria === "Sena" || premiacao.categoria === "Quina" || premiacao.categoria === "Quadra" || premiacao.categoria === "Terno") {
    //             DSpremiacoes.push(premiacao);
    //         }
    //     });

    //     // Timemania
    //     const dezenasSorteadas = [];
    //     const timesSegundoSorteio = [];

    //     // Iterar sobre as entradas do resultado
    //     $('.result__tens-grid--timemania').each(function() {
    //         const valor = $(this).text().trim();

    //         // Verificar se o valor é um número (dezena)
    //         if (!isNaN(valor)) {
    //             const dezena = parseInt(valor, 10);
    //             dezenasSorteadas.push(dezena);
    //         } else {
    //             // Caso não seja um número, considerar como nome de time (segundo sorteio)
    //             timesSegundoSorteio.push(valor);
    //         }
    //     });

    //     // Dividir as dezenasSorteadas em dois sorteios
    //     const primeiroSorteio = dezenasSorteadas.slice(0, 7);
    //     const segundoSorteio = timesSegundoSorteio;

    //     // Dia de Sorte
    //     const DDSdezenasSorteadas = [];
    //     const DDSdiaSegundoSorteio = [];

    //     // Iterar sobre as entradas do resultado
    //     $('.result__tens-grid--dia-de-sorte').each(function() {
    //         const valor = $(this).text().trim();

    //         // Verificar se o valor é um número (dezena)
    //         if (!isNaN(valor)) {
    //             const dezena = parseInt(valor, 10);
    //             DDSdezenasSorteadas.push(dezena);
    //         } else {
    //             // Caso não seja um número, considerar como nome de time (segundo sorteio)
    //             DDSdiaSegundoSorteio.push(valor);
    //         }
    //     });

    //     // Dividir as dezenasSorteadas em dois sorteios
    //     const DDSprimeiroSorteio = DDSdezenasSorteadas.slice(0, 7);
    //     const DDSsegundoSorteio = DDSdiaSegundoSorteio;

    //     // Super Sete
    //     const SSdezenasSorteadas = [];
    //     // Selecionar as dezenas do Super Sete na grade
    //     $('div.result__supersete-grid__column-items span').each(function() {
    //         const dezena = parseInt($(this).text().trim(), 10);
    //         SSdezenasSorteadas.push(dezena);
    //     });

    //     // Mais Milionária
    //     let dezenasSorteioMaisMilionaria = [];
    //     let dezenasTrevoMaisMilionaria = [];

    //     // Selecionar as 6 dezenas do sorteio da Mais Milionária
    //     const sorteioElementsMaisMilionaria = $('section.lot-mais-milionaria div.result__tens-grid div.lot-bg-light span');
    //     if (sorteioElementsMaisMilionaria.length > 0) {
    //         dezenasSorteioMaisMilionaria = sorteioElementsMaisMilionaria.map(function () {
    //             return parseInt($(this).text().trim(), 10);
    //         }).get();
    //     }

    //     // Selecionar as 2 dezenas do trevo da Mais Milionária
    //     const trevoElementsMaisMilionaria = $('section.lot-mais-milionaria div.result__trevo-grid span');
    //     if (trevoElementsMaisMilionaria.length > 0) {
    //         dezenasTrevoMaisMilionaria = trevoElementsMaisMilionaria.map(function () {
    //             return parseInt($(this).text().trim(), 10);
    //         }).get();
    //     }

    //     const resultadoInfo = {
    //         megasena: {
    //             tituloModalidade: $('section.lot-mega-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
    //             dataSorteio: $('section.lot-mega-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
    //             concurso: Number($('section.lot-mega-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
    //             localDoSorteio: $('section.lot-mega-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
    //             valorSorteado: $('section.lot-mega-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
    //             dezenasSorteadas: $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) }),
    //             acumulada: (( $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
    //             premiacoes: $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
    //                 const premiacao = {
    //                     categoria: $(this).find('td:nth-child(1)').text().trim(),
    //                     ganhadores: $(this).find('td:nth-child(2)').text().trim(),
    //                     premio: $(this).find('td:nth-child(3)').text().trim(),
    //                 };
    //                 return premiacao;
    //             }).get(),
    //             proxConcurso: Number($('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
    //             dataProxSorteio: $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
    //             acumuladaProxSorteio: (( $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
    //             valorEstimadoProxConcurso: $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
    //         },
    //         duplasena: {
    //             tituloModalidade: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
    //             dataSorteio: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
    //             concurso: Number($('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
    //             localDoSorteio: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
    //             valorSorteado: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
    //             primeiroSorteio: DStodasDezenas.slice(0, 6),
    //             segundoSorteio: DStodasDezenas.slice(6, 12),
    //             acumulada: (( $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
    //             premiacoesPrimeiroSorteio: DSpremiacoes.slice(0, 4),
    //             premiacoesSegundoSorteio: DSpremiacoes.slice(4),
    //             proxConcurso: Number($('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
    //             dataProxSorteio: $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
    //             acumuladaProxSorteio: (( $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
    //             valorEstimadoProxConcurso: $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
    //         },
    //         lotofacil: {
    //             tituloModalidade: $('section.lot-lotofacil header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
    //             dataSorteio: $('section.lot-lotofacil header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
    //             concurso: Number($('section.lot-lotofacil header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
    //             localDoSorteio: $('section.lot-lotofacil header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
    //             valorSorteado: $('section.lot-lotofacil header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
    //             dezenasSorteadas: $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) }),
    //             acumulada: (( $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
    //             premiacoes: $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
    //                 const premiacao = {
    //                     categoria: $(this).find('td:nth-child(1)').text().trim(),
    //                     ganhadores: $(this).find('td:nth-child(2)').text().trim(),
    //                     premio: $(this).find('td:nth-child(3)').text().trim(),
    //                 };
    //                 return premiacao;
    //             }).get(),
    //             proxConcurso: Number($('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
    //             dataProxSorteio: $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
    //             acumuladaProxSorteio: (( $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
    //             valorEstimadoProxConcurso: $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
    //         },
    //         quina: {
    //             tituloModalidade: $('section.lot-quina header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
    //             dataSorteio: $('section.lot-quina header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
    //             concurso: Number($('section.lot-quina header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
    //             localDoSorteio: $('section.lot-quina header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
    //             valorSorteado: $('section.lot-quina header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
    //             dezenasSorteadas: $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) }),
    //             acumulada: (( $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
    //             premiacoes: $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
    //                 const premiacao = {
    //                     categoria: $(this).find('td:nth-child(1)').text().trim(),
    //                     ganhadores: $(this).find('td:nth-child(2)').text().trim(),
    //                     premio: $(this).find('td:nth-child(3)').text().trim(),
    //                 };
    //                 return premiacao;
    //             }).get(),
    //             proxConcurso: Number($('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
    //             dataProxSorteio: $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
    //             acumuladaProxSorteio: (( $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
    //             valorEstimadoProxConcurso: $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
    //         },
    //         timemania: {
    //             tituloModalidade: $('section.lot-timemania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
    //             dataSorteio: $('section.lot-timemania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
    //             concurso: Number($('section.lot-timemania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
    //             localDoSorteio: $('section.lot-timemania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
    //             valorSorteado: $('section.lot-timemania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
    //             primeiroSorteio: primeiroSorteio,
    //             segundoSorteio: segundoSorteio,
    //             acumulada: (( $('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
    //             premiacoes: $('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
    //                 const premiacao = {
    //                     categoria: $(this).find('td:nth-child(1)').text().trim(),
    //                     ganhadores: $(this).find('td:nth-child(2)').text().trim(),
    //                     premio: $(this).find('td:nth-child(3)').text().trim(),
    //                 };
    //                 return premiacao;
    //             }).get(),
    //             proxConcurso: Number($('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
    //             dataProxSorteio: $('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
    //             acumuladaProxSorteio: (( $('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
    //             valorEstimadoProxConcurso: $('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
    //         },
    //         lotomania: {
    //             tituloModalidade: $('section.lot-lotomania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
    //             dataSorteio: $('section.lot-lotomania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
    //             concurso: Number($('section.lot-lotomania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
    //             localDoSorteio: $('section.lot-lotomania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
    //             valorSorteado: $('section.lot-lotomania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
    //             dezenasSorteadas: $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) }),
    //             acumulada: (( $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
    //             premiacoes: $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
    //                 const premiacao = {
    //                     categoria: $(this).find('td:nth-child(1)').text().trim(),
    //                     ganhadores: $(this).find('td:nth-child(2)').text().trim(),
    //                     premio: $(this).find('td:nth-child(3)').text().trim(),
    //                 };
    //                 return premiacao;
    //             }).get(),
    //             proxConcurso: Number($('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
    //             dataProxSorteio: $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
    //             acumuladaProxSorteio: (( $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
    //             valorEstimadoProxConcurso: $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
    //         },
    //         diaDeSorte: {
    //             tituloModalidade: $('section.lot-dia-de-sorte header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
    //             dataSorteio: $('section.lot-dia-de-sorte header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
    //             concurso: Number($('section.lot-dia-de-sorte header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
    //             localDoSorteio: $('section.lot-dia-de-sorte header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
    //             valorSorteado: $('section.lot-dia-de-sorte header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
    //             primeiroSorteio: DDSprimeiroSorteio,
    //             segundoSorteio: DDSsegundoSorteio,
    //             acumulada: (( $('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
    //             premiacoes: $('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
    //                 const premiacao = {
    //                     categoria: $(this).find('td:nth-child(1)').text().trim(),
    //                     ganhadores: $(this).find('td:nth-child(2)').text().trim(),
    //                     premio: $(this).find('td:nth-child(3)').text().trim(),
    //                 };
    //                 return premiacao;
    //             }).get(),
    //             proxConcurso: Number($('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
    //             dataProxSorteio: $('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
    //             acumuladaProxSorteio: (( $('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
    //             valorEstimadoProxConcurso: $('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
    //         },
    //         superSete: {
    //             tituloModalidade: $('section.lot-super-sete header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
    //             dataSorteio: $('section.lot-super-sete header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
    //             concurso: Number($('section.lot-super-sete header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
    //             localDoSorteio: $('section.lot-super-sete header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
    //             valorSorteado: $('section.lot-super-sete header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
    //             dezenasSorteadas: SSdezenasSorteadas,
    //             acumulada: (( $('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
    //             premiacoes: $('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
    //                 const premiacao = {
    //                     categoria: $(this).find('td:nth-child(1)').text().trim(),
    //                     ganhadores: $(this).find('td:nth-child(2)').text().trim(),
    //                     premio: $(this).find('td:nth-child(3)').text().trim(),
    //                 };
    //                 return premiacao;
    //             }).get(),
    //             proxConcurso: Number($('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
    //             dataProxSorteio: $('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
    //             acumuladaProxSorteio: (( $('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
    //             valorEstimadoProxConcurso: $('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
    //         },
    //         maisMilionaria: {
    //             tituloModalidade: $('section.lot-mais-milionaria header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
    //             dataSorteio: $('section.lot-mais-milionaria header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
    //             concurso: Number($('section.lot-mais-milionaria header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
    //             localDoSorteio: $('section.lot-mais-milionaria header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
    //             valorSorteado: $('section.lot-mais-milionaria header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
    //             dezenasSorteioMaisMilionaria: dezenasSorteioMaisMilionaria,
    //             dezenasTrevoMaisMilionaria: dezenasTrevoMaisMilionaria,
    //             acumulada: (( $('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
    //             premiacoes: $('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
    //                 const premiacao = {
    //                     categoria: $(this).find('td:nth-child(1)').text().trim(),
    //                     ganhadores: $(this).find('td:nth-child(2)').text().trim(),
    //                     premio: $(this).find('td:nth-child(3)').text().trim(),
    //                 };
    //                 return premiacao;
    //             }).get(),
    //             proxConcurso: Number($('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
    //             dataProxSorteio: $('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
    //             acumuladaProxSorteio: (( $('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
    //             valorEstimadoProxConcurso: $('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
    //         }
    //     };
    //     res.json(resultadoInfo);
        // Verifica se os elementos de extração da Mega-Sena estão presentes
        const megaSenaTitle = $('section.lot-mega-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim();
        if (megaSenaTitle) {
            // Extrai os dados da Mega-Sena
            resultadoInfo.megasena = {
                tituloModalidade: megaSenaTitle,
                // Adicione aqui os outros campos de extração para a Mega-Sena
            };
        } else {
            // Configura dados padrão ou vazios para a Mega-Sena
            resultadoInfo.megasena = {
                tituloModalidade: 'Mega-Sena não disponível',
                // Configura outros campos da Mega-Sena como necessário
            };
        }

        // Extrai os dados da Dupla Sena
        resultadoInfo.duplasena = {
            tituloModalidade: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
            dataSorteio: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
            concurso: Number($('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
            localDoSorteio: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
            valorSorteado: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
            primeiroSorteio: $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) }).slice(0, 6),
            segundoSorteio: $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) }).slice(6, 12),
            acumulada: (( $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
            premiacoesPrimeiroSorteio: [],
            premiacoesSegundoSorteio: [],
            proxConcurso: Number($('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
            dataProxSorteio: $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
            acumuladaProxSorteio: (( $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
            valorEstimadoProxConcurso: $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
        };

        res.json(resultadoInfo);
    
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Server Error',
            details: 'The server encountered an internal error while processing the request. Please try again later.'
        });
        console.error(error);
    }
});

app.get('/api/resultados/megasena', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);
        const resultadoInfo = {
            tituloModalidade: $('section.lot-mega-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
            dataSorteio: $('section.lot-mega-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
            concurso: Number($('section.lot-mega-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
            localDoSorteio: $('section.lot-mega-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
            valorSorteado: $('section.lot-mega-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
            dezenasSorteadas: $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) }),
            acumulada: (( $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
            premiacoes: $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
                const premiacao = {
                    categoria: $(this).find('td:nth-child(1)').text().trim(),
                    ganhadores: $(this).find('td:nth-child(2)').text().trim(),
                    premio: $(this).find('td:nth-child(3)').text().trim(),
                };
                return premiacao;
            }).get(),
            proxConcurso: Number($('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
            dataProxSorteio: $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
            acumuladaProxSorteio: (( $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
            valorEstimadoProxConcurso: $('section.lot-mega-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
        };
        res.json(resultadoInfo);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Server Error',
            details: 'The server encountered an internal error while processing the request. Please try again later.'
        });
        console.error(error);
    }
});

app.get('/api/resultados/duplasena', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);
        
        // Dupla Sena
        var DStodasDezenas = $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) });
        var DSpremiacoes = [];

        $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').each(function() {
            const premiacao = {
                categoria: $(this).find('td:nth-child(1)').text().trim(),
                ganhadores: $(this).find('td:nth-child(2)').text().trim(),
                premio: $(this).find('td:nth-child(3)').text().trim(),
            };

            // Verificando se a categoria pertence ao primeiro ou segundo sorteio
            if (premiacao.categoria === "Sena" || premiacao.categoria === "Quina" || premiacao.categoria === "Quadra" || premiacao.categoria === "Terno") {
                DSpremiacoes.push(premiacao);
            }
        });
 
        const resultadoInfo = {
            tituloModalidade: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
            dataSorteio: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
            concurso: Number($('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
            localDoSorteio: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
            valorSorteado: $('section.lot-dupla-sena header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
            primeiroSorteio: DStodasDezenas.slice(0, 6),
            segundoSorteio: DStodasDezenas.slice(6, 12),
            acumulada: (( $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
            premiacoesPrimeiroSorteio: DSpremiacoes.slice(0, 4),
            premiacoesSegundoSorteio: DSpremiacoes.slice(4),
            proxConcurso: Number($('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
            dataProxSorteio: $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
            acumuladaProxSorteio: (( $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
            valorEstimadoProxConcurso: $('section.lot-dupla-sena div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
        };
        res.json(resultadoInfo);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Server Error',
            details: 'The server encountered an internal error while processing the request. Please try again later.'
        });
        console.error(error);
    }
});

app.get('/api/resultados/lotofacil', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);
 
        const resultadoInfo = {
            tituloModalidade: $('section.lot-lotofacil header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
            dataSorteio: $('section.lot-lotofacil header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
            concurso: Number($('section.lot-lotofacil header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
            localDoSorteio: $('section.lot-lotofacil header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
            valorSorteado: $('section.lot-lotofacil header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
            dezenasSorteadas: $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) }),
            acumulada: (( $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
            premiacoes: $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
                const premiacao = {
                    categoria: $(this).find('td:nth-child(1)').text().trim(),
                    ganhadores: $(this).find('td:nth-child(2)').text().trim(),
                    premio: $(this).find('td:nth-child(3)').text().trim(),
                };
                return premiacao;
            }).get(),
            proxConcurso: Number($('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
            dataProxSorteio: $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
            acumuladaProxSorteio: (( $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
            valorEstimadoProxConcurso: $('section.lot-lotofacil div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
        };
        res.json(resultadoInfo);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Server Error',
            details: 'The server encountered an internal error while processing the request. Please try again later.'
        });
        console.error(error);
    }
});

app.get('/api/resultados/quina', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);
 
        const resultadoInfo = {
            tituloModalidade: $('section.lot-quina header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
            dataSorteio: $('section.lot-quina header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
            concurso: Number($('section.lot-quina header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
            localDoSorteio: $('section.lot-quina header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
            valorSorteado: $('section.lot-quina header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
            dezenasSorteadas: $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) }),
            acumulada: (( $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
            premiacoes: $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
                const premiacao = {
                    categoria: $(this).find('td:nth-child(1)').text().trim(),
                    ganhadores: $(this).find('td:nth-child(2)').text().trim(),
                    premio: $(this).find('td:nth-child(3)').text().trim(),
                };
                return premiacao;
            }).get(),
            proxConcurso: Number($('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
            dataProxSorteio: $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
            acumuladaProxSorteio: (( $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
            valorEstimadoProxConcurso: $('section.lot-quina div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
        };
        res.json(resultadoInfo);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Server Error',
            details: 'The server encountered an internal error while processing the request. Please try again later.'
        });
        console.error(error);
    }
});

app.get('/api/resultados/timemania', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);

        // Timemania
        const dezenasSorteadas = [];
        const timesSegundoSorteio = [];

        // Iterar sobre as entradas do resultado
        $('.result__tens-grid--timemania').each(function() {
            const valor = $(this).text().trim();

            // Verificar se o valor é um número (dezena)
            if (!isNaN(valor)) {
                const dezena = parseInt(valor, 10);
                dezenasSorteadas.push(dezena);
            } else {
                // Caso não seja um número, considerar como nome de time (segundo sorteio)
                timesSegundoSorteio.push(valor);
            }
        });

        // Dividir as dezenasSorteadas em dois sorteios
        const primeiroSorteio = dezenasSorteadas.slice(0, 7);
        const segundoSorteio = timesSegundoSorteio;
 
        const resultadoInfo = {
            tituloModalidade: $('section.lot-timemania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
            dataSorteio: $('section.lot-timemania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
            concurso: Number($('section.lot-timemania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
            localDoSorteio: $('section.lot-timemania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
            valorSorteado: $('section.lot-timemania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
            primeiroSorteio: primeiroSorteio,
            segundoSorteio: segundoSorteio,
            acumulada: (( $('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
            premiacoes: $('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
                const premiacao = {
                    categoria: $(this).find('td:nth-child(1)').text().trim(),
                    ganhadores: $(this).find('td:nth-child(2)').text().trim(),
                    premio: $(this).find('td:nth-child(3)').text().trim(),
                };
                return premiacao;
            }).get(),
            proxConcurso: Number($('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
            dataProxSorteio: $('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
            acumuladaProxSorteio: (( $('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
            valorEstimadoProxConcurso: $('section.lot-timemania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
        };
        res.json(resultadoInfo);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Server Error',
            details: 'The server encountered an internal error while processing the request. Please try again later.'
        });
        console.error(error);
    }
});

app.get('/api/resultados/lotomania', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);
 
        const resultadoInfo = {
            tituloModalidade: $('section.lot-lotomania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
            dataSorteio: $('section.lot-lotomania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
            concurso: Number($('section.lot-lotomania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
            localDoSorteio: $('section.lot-lotomania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
            valorSorteado: $('section.lot-lotomania header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
            dezenasSorteadas: $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap div.result__tens-grid div.lot-bg-light span').text().trim().match(/.{2}/g).map(function (dezena) { return parseInt(dezena, 10) }),
            acumulada: (( $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
            premiacoes: $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
                const premiacao = {
                    categoria: $(this).find('td:nth-child(1)').text().trim(),
                    ganhadores: $(this).find('td:nth-child(2)').text().trim(),
                    premio: $(this).find('td:nth-child(3)').text().trim(),
                };
                return premiacao;
            }).get(),
            proxConcurso: Number($('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
            dataProxSorteio: $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
            acumuladaProxSorteio: (( $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
            valorEstimadoProxConcurso: $('section.lot-lotomania div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
        };
        res.json(resultadoInfo);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Server Error',
            details: 'The server encountered an internal error while processing the request. Please try again later.'
        });
        console.error(error);
    }
});

app.get('/api/resultados/diadesorte', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);

        // Dia de Sorte
        const DDSdezenasSorteadas = [];
        const DDSdiaSegundoSorteio = [];

        // Iterar sobre as entradas do resultado
        $('.result__tens-grid--dia-de-sorte').each(function() {
            const valor = $(this).text().trim();

            // Verificar se o valor é um número (dezena)
            if (!isNaN(valor)) {
                const dezena = parseInt(valor, 10);
                DDSdezenasSorteadas.push(dezena);
            } else {
                // Caso não seja um número, considerar como nome de time (segundo sorteio)
                DDSdiaSegundoSorteio.push(valor);
            }
        });

        // Dividir as dezenasSorteadas em dois sorteios
        const DDSprimeiroSorteio = DDSdezenasSorteadas.slice(0, 7);
        const DDSsegundoSorteio = DDSdiaSegundoSorteio;
 
        const resultadoInfo = {
            tituloModalidade: $('section.lot-dia-de-sorte header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
            dataSorteio: $('section.lot-dia-de-sorte header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
            concurso: Number($('section.lot-dia-de-sorte header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
            localDoSorteio: $('section.lot-dia-de-sorte header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
            valorSorteado: $('section.lot-dia-de-sorte header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
            primeiroSorteio: DDSprimeiroSorteio,
            segundoSorteio: DDSsegundoSorteio,
            acumulada: (( $('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
            premiacoes: $('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
                const premiacao = {
                    categoria: $(this).find('td:nth-child(1)').text().trim(),
                    ganhadores: $(this).find('td:nth-child(2)').text().trim(),
                    premio: $(this).find('td:nth-child(3)').text().trim(),
                };
                return premiacao;
            }).get(),
            proxConcurso: Number($('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
            dataProxSorteio: $('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
            acumuladaProxSorteio: (( $('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
            valorEstimadoProxConcurso: $('section.lot-dia-de-sorte div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
        };
        res.json(resultadoInfo);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Server Error',
            details: 'The server encountered an internal error while processing the request. Please try again later.'
        });
        console.error(error);
    }
});

app.get('/api/resultados/supersete', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);

        // Super Sete
        const SSdezenasSorteadas = [];
        // Selecionar as dezenas do Super Sete na grade
        $('div.result__supersete-grid__column-items span').each(function() {
            const dezena = parseInt($(this).text().trim(), 10);
            SSdezenasSorteadas.push(dezena);
        });
 
        const resultadoInfo = {
            tituloModalidade: $('section.lot-super-sete header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
            dataSorteio: $('section.lot-super-sete header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
            concurso: Number($('section.lot-super-sete header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
            localDoSorteio: $('section.lot-super-sete header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
            valorSorteado: $('section.lot-super-sete header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
            dezenasSorteadas: SSdezenasSorteadas,
            acumulada: (( $('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
            premiacoes: $('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
                const premiacao = {
                    categoria: $(this).find('td:nth-child(1)').text().trim(),
                    ganhadores: $(this).find('td:nth-child(2)').text().trim(),
                    premio: $(this).find('td:nth-child(3)').text().trim(),
                };
                return premiacao;
            }).get(),
            proxConcurso: Number($('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
            dataProxSorteio: $('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
            acumuladaProxSorteio: (( $('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
            valorEstimadoProxConcurso: $('section.lot-super-sete div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
        };
        res.json(resultadoInfo);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Server Error',
            details: 'The server encountered an internal error while processing the request. Please try again later.'
        });
        console.error(error);
    }
});

app.get('/api/resultados/maismilionaria', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);

        // Mais Milionária
        let dezenasSorteioMaisMilionaria = [];
        let dezenasTrevoMaisMilionaria = [];

        // Selecionar as 6 dezenas do sorteio da Mais Milionária
        const sorteioElementsMaisMilionaria = $('section.lot-mais-milionaria div.result__tens-grid div.lot-bg-light span');
        if (sorteioElementsMaisMilionaria.length > 0) {
            dezenasSorteioMaisMilionaria = sorteioElementsMaisMilionaria.map(function () {
                return parseInt($(this).text().trim(), 10);
            }).get();
        }

        // Selecionar as 2 dezenas do trevo da Mais Milionária
        const trevoElementsMaisMilionaria = $('section.lot-mais-milionaria div.result__trevo-grid span');
        if (trevoElementsMaisMilionaria.length > 0) {
            dezenasTrevoMaisMilionaria = trevoElementsMaisMilionaria.map(function () {
                return parseInt($(this).text().trim(), 10);
            }).get();
        }
 
        const resultadoInfo = {
            tituloModalidade: $('section.lot-mais-milionaria header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__title h2').text().trim(),
            dataSorteio: $('section.lot-mais-milionaria header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw-date strong').text().trim(),
            concurso: Number($('section.lot-mais-milionaria header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__draw strong').text().trim()),
            localDoSorteio: $('section.lot-mais-milionaria header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__local div strong').text().trim(),
            valorSorteado: $('section.lot-mais-milionaria header.lottery-totem__header div.lottery-totem__header-grid div.lottery-totem__header-grid__result div.result__prize div.result__prize__wrap').text().trim(),
            dezenasSorteioMaisMilionaria: dezenasSorteioMaisMilionaria,
            dezenasTrevoMaisMilionaria: dezenasTrevoMaisMilionaria,
            acumulada: (( $('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content div.result__content__wrap p strong').text().trim() === 'Acumulou!' )?true:false),
            premiacoes: $('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__body div.lottery-totem__body__content table.result__table-prize tbody tr:not(:first-child)').map(function() {
                const premiacao = {
                    categoria: $(this).find('td:nth-child(1)').text().trim(),
                    ganhadores: $(this).find('td:nth-child(2)').text().trim(),
                    premio: $(this).find('td:nth-child(3)').text().trim(),
                };
                return premiacao;
            }).get(),
            proxConcurso: Number($('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw strong').text().trim()),
            dataProxSorteio: $('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__draw-date strong').text().trim(),
            acumuladaProxSorteio: (( $('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__is-jackpot span').text().trim() === 'Acumulada!' )?true:false),
            valorEstimadoProxConcurso: $('section.lot-mais-milionaria div.lottery-totem__modules-grid div.lottery-totem__aside div.lottery-totem__aside__wrap div.lottery-totem__nextdraw div.card div.lottery-totem__nextdraw__block div.lottery-totem__nextdraw__info div.lottery-totem__nextdraw__prize div.lottery-totem__nextdraw__prize__wrap').text().trim(),
        };
        res.json(resultadoInfo);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Server Error',
            details: 'The server encountered an internal error while processing the request. Please try again later.'
        });
        console.error(error);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Started at port '+PORT);
});