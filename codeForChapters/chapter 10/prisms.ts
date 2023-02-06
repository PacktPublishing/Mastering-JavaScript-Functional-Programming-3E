import type { OBJ } from "../common";

const getFieldP =
  <O extends OBJ>(attr: string) =>
  (obj: O) =>
    obj && attr in obj ? obj[attr] : undefined;

const setFieldP =
  <O extends OBJ>(attr: string) =>
  (value: any) =>
  (obj: O): O =>
    obj && attr in obj
      ? { ...obj, [attr]: value }
      : { ...obj };

export { getFieldP, setFieldP };
