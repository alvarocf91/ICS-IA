'use server';

import { pool } from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function getRequiredString(formData, fieldName) {
  const value = formData.get(fieldName);

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`El campo ${fieldName} es obligatorio.`);
  }

  return value.trim();
}

function getRequiredPositiveNumber(formData, fieldName) {
  const value = Number(formData.get(fieldName));

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`El campo ${fieldName} debe ser un numero positivo.`);
  }

  return value;
}

export async function guardarReceta(formData) {
  const titulo = getRequiredString(formData, 'titulo');
  const descripcionCorta = getRequiredString(formData, 'descripcion_corta');
  const ingredientes = getRequiredString(formData, 'ingredientes');
  const instrucciones = getRequiredString(formData, 'instrucciones');
  const tiempoCoccion = getRequiredPositiveNumber(formData, 'tiempo_coccion');

  const [result] = await pool.execute(
    'INSERT INTO recetas (titulo, descripcion_corta, ingredientes, instrucciones, tiempo_coccion) VALUES (?, ?, ?, ?, ?)',
    [titulo, descripcionCorta, ingredientes, instrucciones, tiempoCoccion],
  );

  revalidatePath('/');
  redirect(`/recetas/${result.insertId}`);
}

export async function editarReceta(id, formData) {
  const titulo = getRequiredString(formData, 'titulo');
  const descripcionCorta = getRequiredString(formData, 'descripcion_corta');
  const ingredientes = getRequiredString(formData, 'ingredientes');
  const instrucciones = getRequiredString(formData, 'instrucciones');
  const tiempoCoccion = getRequiredPositiveNumber(formData, 'tiempo_coccion');

  await pool.execute(
    'UPDATE recetas SET titulo = ?, descripcion_corta = ?, ingredientes = ?, instrucciones = ?, tiempo_coccion = ? WHERE id = ?',
    [titulo, descripcionCorta, ingredientes, instrucciones, tiempoCoccion, id],
  );

  revalidatePath(`/recetas/${id}`);
  revalidatePath('/');
  redirect(`/recetas/${id}`);
}

export async function borrarReceta(id) {
  await pool.execute('DELETE FROM recetas WHERE id = ?', [id]);
  revalidatePath('/');
  revalidatePath(`/recetas/${id}`);
  redirect('/');
}

export async function agregarComentario(recetaId, formData) {
  const autor = getRequiredString(formData, 'autor');
  const texto = getRequiredString(formData, 'texto');

  await pool.execute(
    'INSERT INTO comentarios (receta_id, autor, texto) VALUES (?, ?, ?)',
    [recetaId, autor, texto],
  );

  revalidatePath(`/recetas/${recetaId}`);
  redirect(`/recetas/${recetaId}`);
}
