import * as yup from 'yup';

export const email = yup.string().email("Lütfen geçerli bir email giriniz.").required("Lütfen bir email giriniz.");
export const password = yup.string().min(6, "Şifre en az 6 karakterden oluşmalı.").required("Lütfen bir şifre giriniz.");

export const projectDescription = yup.string().required("Lütfen proje için bir açıklama giriniz.");
export const projectNote = yup.string().required("Lütfen bir not giriniz.");

export const sprintName = yup.string().required("Lütfen bir sprint adı giriniz.");
export const sprintStatus = yup.number("Lütfen sprint'in durumunu seçiniz.").required("Lütfen sprint'in durumunu seçiniz.");
export const sprintEstimatedFinishDate = yup.date().required("Lütfen sprint için tahmini bir bitiş tarihi giriniz.");

export const taskTitle = yup.string().required("Lütfen bir iş başlığı giriniz.");
export const taskDescription = yup.string().required("Lütfen iş için bir açıklama giriniz.");
export const taskPriority = yup.string().required("Lütfen iş için bir öncelik seçiniz.");
export const taskProject = yup.string().required("Lütfen iş için bir proje seçiniz.");
export const taskSprint = yup.string().required("Lütfen bir sprint seçiniz.");
export const taskStatus = yup.string().required("Lütfen iş için bir durum seçiniz.");
export const taskStartDate = yup.date().required("Lütfen iş için bir başlangıç tarihi giriniz.");
export const taskEstimatedFinishDate = yup.date().required("Lütfen iş için tahmini bir bitiş tarihi giriniz.");

export const taskFileName = yup.string().required("Lütfen iş dosyası için bir ad giriniz.");
export const taskFileDescription = yup.string();

export const taskComment = yup.string().required("Lütfen bir yorum giriniz.");
