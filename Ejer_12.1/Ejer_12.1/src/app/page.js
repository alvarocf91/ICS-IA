"use client";

import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("Cargando imagenes...");
  const [isUploading, setIsUploading] = useState(false);

  const activeTerms = useMemo(
    () => query.split(/[,\s]+/).map((term) => term.trim()).filter(Boolean),
    [query],
  );

  useEffect(() => {
    loadImages("");
  }, []);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  async function loadImages(search) {
    setStatus("Buscando imagenes...");
    const response = await fetch(`/api/images?q=${encodeURIComponent(search)}`);
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error || "No se han podido cargar las imagenes.");
      return;
    }

    setImages(data.images);
    setStatus(data.images.length ? "" : "No hay imagenes para mostrar.");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!file) {
      setStatus("Selecciona una imagen antes de subirla.");
      return;
    }

    setIsUploading(true);
    setStatus("Subiendo a Filebase y analizando con Groq...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus(data.error || "No se pudo guardar la imagen.");
        return;
      }

      setImages((current) => [data.image, ...current]);
      setFile(null);
      form.reset();
      setStatus("Imagen guardada correctamente.");
    } catch (error) {
      setStatus(`No se pudo conectar con el servidor de Next. ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    loadImages(query);
  }

  function clearSearch() {
    setQuery("");
    loadImages("");
  }

  return (
    <main className="app-shell">
      <section className="toolbar" aria-label="Gestion de imagenes">
        <div>
          <p className="eyebrow">EJER_12.1</p>
          <h1>Gestor de imagenes</h1>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <label htmlFor="search">Buscar contenido</label>
          <div className="search-row">
            <input
              id="search"
              type="search"
              placeholder="coche, persona, playa"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit">Buscar</button>
            <button type="button" className="secondary-button" onClick={clearSearch}>
              Limpiar
            </button>
          </div>
          <p className="hint">
            Puedes buscar por tres o mas terminos a la vez separandolos por espacios o comas.
          </p>
        </form>
      </section>

      <section className="upload-band">
        <form className="upload-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="image">Nueva imagen</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
            />
          </div>
          <button type="submit" disabled={isUploading}>
            {isUploading ? "Analizando..." : "Subir imagen"}
          </button>
        </form>

        {preview ? (
          <img className="preview" src={preview} alt="Vista previa de la imagen seleccionada" />
        ) : null}
      </section>

      {activeTerms.length > 0 ? (
        <div className="terms" aria-label="Terminos activos">
          {activeTerms.map((term) => (
            <span key={term}>{term}</span>
          ))}
        </div>
      ) : null}

      {status ? <p className="status">{status}</p> : null}

      <section className="gallery" aria-label="Imagenes guardadas">
        {images.map((image) => (
          <article className="image-card" key={image.id}>
            <img src={image.url} alt={image.originalName || image.filename} />
            <div className="card-content">
              <h2>{image.filename}</h2>
              <p>{image.originalName}</p>
              <div className="objects">
                {image.objects.map((object) => (
                  <span key={object}>{object}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
