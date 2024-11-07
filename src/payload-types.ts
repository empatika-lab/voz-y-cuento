/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    admins: AdminAuthOperations;
    students: StudentAuthOperations;
  };
  collections: {
    admins: Admin;
    courses: Course;
    media: Media;
    events: Event;
    students: Student;
    pending: Pending;
    comment: Comment;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsSelect?: {
    admins: AdminsSelect<false> | AdminsSelect<true>;
    courses: CoursesSelect<false> | CoursesSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    events: EventsSelect<false> | EventsSelect<true>;
    students: StudentsSelect<false> | StudentsSelect<true>;
    pending: PendingSelect<false> | PendingSelect<true>;
    comment: CommentSelect<false> | CommentSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect?: {};
  locale: null;
  user:
    | (Admin & {
        collection: 'admins';
      })
    | (Student & {
        collection: 'students';
      });
  jobs?: {
    tasks: unknown;
    workflows?: unknown;
  };
}
export interface AdminAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
export interface StudentAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admins".
 */
export interface Admin {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "courses".
 */
export interface Course {
  id: number;
  name: string;
  isFree?: boolean | null;
  arsPrice: number;
  usdPrice: number;
  shortDescription: string;
  longDescription: string;
  image: number | Media;
  category: 'Taller' | 'Laboratorio' | 'Seminario';
  syllabus?:
    | {
        unit?: string | null;
        id?: string | null;
      }[]
    | null;
  blocks?:
    | {
        content?:
          | (
              | {
                  link: string;
                  description?: string | null;
                  id?: string | null;
                  blockName?: string | null;
                  blockType: 'video';
                }
              | {
                  content: {
                    root: {
                      type: string;
                      children: {
                        type: string;
                        version: number;
                        [k: string]: unknown;
                      }[];
                      direction: ('ltr' | 'rtl') | null;
                      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                      indent: number;
                      version: number;
                    };
                    [k: string]: unknown;
                  };
                  id?: string | null;
                  blockName?: string | null;
                  blockType: 'exercise';
                }
              | {
                  material: {
                    root: {
                      type: string;
                      children: {
                        type: string;
                        version: number;
                        [k: string]: unknown;
                      }[];
                      direction: ('ltr' | 'rtl') | null;
                      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                      indent: number;
                      version: number;
                    };
                    [k: string]: unknown;
                  };
                  id?: string | null;
                  blockName?: string | null;
                  blockType: 'additional-material';
                }
            )[]
          | null;
        id?: string | null;
      }[]
    | null;
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  _key?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: number;
  title: string;
  description: string;
  category: 'Maternal' | 'Infantil' | 'Familiar' | 'Adultos' | 'Personalizado';
  image: number | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "students".
 */
export interface Student {
  id: number;
  name?: string | null;
  whatsapp?: string | null;
  courses?: (number | Course)[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pending".
 */
export interface Pending {
  id: number;
  course: number | Course;
  student: number | Student;
  isPaid: boolean;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "comment".
 */
export interface Comment {
  id: number;
  comment?: string | null;
  course?: (number | Course)[] | null;
  block?: number | null;
  author?: string | null;
  highlighted?: boolean | null;
  responses?:
    | {
        response?: string | null;
        highlighted?: boolean | null;
        author?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'admins';
        value: number | Admin;
      } | null)
    | ({
        relationTo: 'courses';
        value: number | Course;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'events';
        value: number | Event;
      } | null)
    | ({
        relationTo: 'students';
        value: number | Student;
      } | null)
    | ({
        relationTo: 'pending';
        value: number | Pending;
      } | null)
    | ({
        relationTo: 'comment';
        value: number | Comment;
      } | null);
  globalSlug?: string | null;
  user:
    | {
        relationTo: 'admins';
        value: number | Admin;
      }
    | {
        relationTo: 'students';
        value: number | Student;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user:
    | {
        relationTo: 'admins';
        value: number | Admin;
      }
    | {
        relationTo: 'students';
        value: number | Student;
      };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admins_select".
 */
export interface AdminsSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "courses_select".
 */
export interface CoursesSelect<T extends boolean = true> {
  name?: T;
  isFree?: T;
  arsPrice?: T;
  usdPrice?: T;
  shortDescription?: T;
  longDescription?: T;
  image?: T;
  category?: T;
  syllabus?:
    | T
    | {
        unit?: T;
        id?: T;
      };
  blocks?:
    | T
    | {
        content?:
          | T
          | {
              video?:
                | T
                | {
                    link?: T;
                    description?: T;
                    id?: T;
                    blockName?: T;
                  };
              exercise?:
                | T
                | {
                    content?: T;
                    id?: T;
                    blockName?: T;
                  };
              'additional-material'?:
                | T
                | {
                    material?: T;
                    id?: T;
                    blockName?: T;
                  };
            };
        id?: T;
      };
  slug?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  _key?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events_select".
 */
export interface EventsSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  category?: T;
  image?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "students_select".
 */
export interface StudentsSelect<T extends boolean = true> {
  name?: T;
  whatsapp?: T;
  courses?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pending_select".
 */
export interface PendingSelect<T extends boolean = true> {
  course?: T;
  student?: T;
  isPaid?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "comment_select".
 */
export interface CommentSelect<T extends boolean = true> {
  comment?: T;
  course?: T;
  block?: T;
  author?: T;
  highlighted?: T;
  responses?:
    | T
    | {
        response?: T;
        highlighted?: T;
        author?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}