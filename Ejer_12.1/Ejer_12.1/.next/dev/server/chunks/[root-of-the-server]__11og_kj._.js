module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/src/lib/groq.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "detectObjectsWithGroq",
    ()=>detectObjectsWithGroq
]);
const GROQ_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
async function detectObjectsWithGroq({ buffer, contentType }) {
    const apiKey = process.env.GROQ_API_KEY?.trim();
    if (!apiKey) {
        throw new Error("Falta GROQ_API_KEY en .env.local");
    }
    const base64Image = buffer.toString("base64");
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: GROQ_MODEL,
            temperature: 0.1,
            max_completion_tokens: 600,
            response_format: {
                type: "json_object"
            },
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Analiza la imagen y devuelve solo JSON valido con esta forma: " + '{"objects":["objeto1","objeto2"]}. ' + "Incluye objetos, animales, personas, lugares o elementos visibles. " + "Usa sustantivos en espanol, en minusculas, sin articulos, sin duplicados y maximo 25 elementos."
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:${contentType};base64,${base64Image}`
                            }
                        }
                    ]
                }
            ]
        })
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq ha devuelto ${response.status}: ${errorText}`);
    }
    const completion = await response.json();
    const rawContent = completion.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(rawContent);
    return normalizeObjects(parsed.objects);
}
function normalizeObjects(objects) {
    if (!Array.isArray(objects)) {
        return [];
    }
    const normalized = objects.map((item)=>String(item).toLowerCase().trim()).map((item)=>item.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).map((item)=>item.replace(/[^a-z0-9ñ\s-]/gi, "").replace(/\s+/g, " ")).filter(Boolean);
    return [
        ...new Set(normalized)
    ];
}
}),
"[project]/src/lib/mongodb.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getImagesCollection",
    ()=>getImagesCollection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/node_modules/mongodb)");
;
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "libreria";
if (!uri) {
    throw new Error("Falta MONGODB_URI en .env.local");
}
let clientPromise;
if ("TURBOPACK compile-time truthy", 1) {
    if (!/*TURBOPACK member replacement*/ __turbopack_context__.g._mongoClientPromise) {
        const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__["MongoClient"](uri);
        /*TURBOPACK member replacement*/ __turbopack_context__.g._mongoClientPromise = client.connect();
    }
    clientPromise = /*TURBOPACK member replacement*/ __turbopack_context__.g._mongoClientPromise;
} else //TURBOPACK unreachable
;
async function getImagesCollection() {
    const client = await clientPromise;
    return client.db(dbName).collection("imagenes");
}
}),
"[project]/src/lib/s3.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getImageFromS3",
    ()=>getImageFromS3,
    "s3",
    ()=>s3,
    "uploadImageToS3",
    ()=>uploadImageToS3
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__ = __turbopack_context__.i("[externals]/@aws-sdk/client-s3 [external] (@aws-sdk/client-s3, cjs, [project]/node_modules/@aws-sdk/client-s3)");
;
const endpoint = process.env.S3_ENDPOINT;
const bucket = process.env.S3_BUCKET_NAME;
if (!endpoint || !bucket) {
    throw new Error("Faltan S3_ENDPOINT o S3_BUCKET_NAME en .env.local");
}
const s3 = new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__["S3Client"]({
    region: process.env.S3_REGION || "auto",
    endpoint,
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
});
async function uploadImageToS3({ key, body, contentType }) {
    await s3.send(new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__["PutObjectCommand"]({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType
    }));
}
async function getImageFromS3(key) {
    return s3.send(new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__["GetObjectCommand"]({
        Bucket: bucket,
        Key: key
    }));
}
}),
"[project]/src/app/api/images/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$groq$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/groq.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$s3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/s3.js [app-route] (ecmascript)");
;
;
;
;
;
;
async function GET(request) {
    try {
        const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getImagesCollection"])();
        const { searchParams } = new URL(request.url);
        const terms = parseTerms(searchParams.get("q"));
        const query = terms.length > 0 ? {
            objects: {
                $all: terms
            }
        } : {};
        const images = await collection.find(query).sort({
            createdAt: -1
        }).limit(60).toArray();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            images: images.map((image)=>({
                    id: image._id.toString(),
                    filename: image.filename,
                    originalName: image.originalName,
                    objects: image.objects || [],
                    createdAt: image.createdAt,
                    url: `/api/images/${image.filename}`
                }))
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: friendlyError(error)
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("image");
        if (!file || typeof file === "string") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Sube una imagen valida."
            }, {
                status: 400
            });
        }
        if (!file.type?.startsWith("image/")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "El archivo debe ser una imagen."
            }, {
                status: 400
            });
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const extension = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["extname"])(file.name) || mimeExtension(file.type);
        const filename = `${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])()}${extension}`;
        console.log(`[images] Subiendo ${filename} a Filebase/S3...`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$s3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uploadImageToS3"])({
            key: filename,
            body: buffer,
            contentType: file.type
        });
        console.log(`[images] Analizando ${filename} con Groq...`);
        const objects = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$groq$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["detectObjectsWithGroq"])({
            buffer,
            contentType: file.type
        });
        const document = {
            filename,
            originalName: file.name,
            contentType: file.type,
            size: file.size,
            objects,
            createdAt: new Date()
        };
        console.log(`[images] Guardando ${filename} en MongoDB...`);
        const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getImagesCollection"])();
        const result = await collection.insertOne(document);
        console.log(`[images] Imagen ${filename} guardada correctamente.`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            image: {
                id: result.insertedId.toString(),
                filename,
                originalName: file.name,
                objects,
                createdAt: document.createdAt,
                url: `/api/images/${filename}`
            }
        }, {
            status: 201
        });
    } catch (error) {
        console.error("[images] Error en POST /api/images:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: friendlyError(error)
        }, {
            status: 500
        });
    }
}
function parseTerms(value) {
    if (!value) {
        return [];
    }
    return value.split(/[,\s]+/).map((term)=>term.toLowerCase().trim()).map((term)=>term.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).filter(Boolean).slice(0, 8);
}
function mimeExtension(type) {
    const extensions = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
        "image/gif": ".gif"
    };
    return extensions[type] || ".jpg";
}
function friendlyError(error) {
    const message = error?.message || "Error desconocido";
    if (error?.name === "NoSuchBucket" || message.includes("NoSuchBucket")) {
        return "El bucket de Filebase/S3 no existe o no es accesible. Revisa S3_BUCKET_NAME en .env.local.";
    }
    if (message.includes("Groq")) {
        return `Error al analizar la imagen con Groq. ${message}`;
    }
    if (message.includes("Mongo")) {
        return `Error al guardar en MongoDB. ${message}`;
    }
    return message;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__11og_kj._.js.map