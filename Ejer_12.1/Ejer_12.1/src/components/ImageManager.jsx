"use client";

import { useMemo, useRef, useState } from "react";

export default function ImageManager({ initialImages }) {
  const [images, setImages] = useState(initialImages);
  const [query, setQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const terms = useMemo(
    () =>
      query
        .split(",")
        .map((term) => term.trim())
        .filter(Boolean),
    [query]
  );

  async function uploadImage(event) {
    event.preventDefault();
    if (!selectedFile) {
      setMessage("Selecciona una imagen primero.");
      return;
    }

    setIsUploading(true);
    setMessage("Analizando imagen con IA...");

    const formData = new FormData();
    formData.append("image", selectedFile);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "No se pudo subir la imagen.");
      setIsUploading(false);
      return;
    }

    setImages((current) => [data.image, ...current]);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setMessage("Imagen subida y etiquetada correctamente.");
    setIsUploading(false);
  }

  async function searchImages(event) {
    event.preventDefault();
    setIsSearching(true);
    setMessage("");

    const response = await fetch(`/api/images?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "No se pudo realizar la busqueda.");
      setIsSearching(false);
      return;
    }

    setImages(data.images);
    setIsSearching(false);
  }

  async function clearSearch() {
    setQuery("");
    setIsSearching(true);
    const response = await fetch("/api/images");
    const data = await response.json();
    setImages(data.images || []);
    setIsSearching(false);
  }

  return (
    <main className="shell">
      <section className="toolbar">
        <div>
          <p className="eyebrow">EJER_12.1</p>
          <h1>Gestor de imagenes</h1>
        </div>
        <p className="count">{images.length} imagenes</p>
      </section>

      <section className="workbench">
        <form className="panel upload-panel" onSubmit={uploadImage}>
          <label htmlFor="image">Subir imagen</label>
          <div className="file-row">
            <input
              ref={fileInputRef}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
            />
            <button type="submit" disabled={isUploading}>
              {isUploading ? "Procesando..." : "Subir"}
            </button>
          </div>
          {selectedFile ? <p className="hint">{selectedFile.name}</p> : null}
        </form>

        <form className="panel search-panel" onSubmit={searchImages}>
          <label htmlFor="search">Buscar contenido</label>
          <div className="search-row">
            <input
              id="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="persona, coche, playa"
            />
            <button type="submit" disabled={isSearching}>
              {isSearching ? "Buscando..." : "Buscar"}
            </button>
            <button className="secondary" type="button" onClick={clearSearch}>
              Limpiar
            </button>
          </div>
          <div className="chips">
            {terms.map((term) => (
              <span key={term}>{term}</span>
            ))}
          </div>
        </form>
      </section>

      {message ? <p className="message">{message}</p> : null}

      <section className="gallery" aria-live="polite">
        {images.map((image) => (
          <article className="image-card" key={image.id}>
            <img src={image.imageUrl} alt={image.objects.join(", ") || image.originalName} />
            <div className="image-meta">
              <h2>{image.originalName || image.filename}</h2>
              <p>{image.filename}</p>
              <div className="tags">
                {image.objects.map((object) => (
                  <span key={object}>{object}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {images.length === 0 ? (
        <section className="empty">
          <h2>No hay imagenes que coincidan</h2>
          <p>Sube una imagen o prueba con otros terminos separados por comas.</p>
        </section>
      ) : null}
    </main>
  );
}
