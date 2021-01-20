import { DEFINITION_BY_VAL, ENUM } from 'modules-pack/variables/definitions'
import { definitionByValue, enumFrom, l } from 'utils-pack'

/**
 * LOCALISED DEFINITIONS =======================================================
 * =============================================================================
 */


export const _USER = {

  ROLE: {
    // 0: 'Any' - zero value code is used to delete record in database
    // Language is the bottom most in hierarchy because code should be defined only once
    // and it's easier to see all translation of the same word together
    // We use numbered code for security reasons so it's harder for hackers to guess.
    // Numbered code also allows computation of permissions with quick `<` or `>` checks
    USER: {
      _: 0, // default role -> undefined in database
      [l.ENGLISH]: 'User',
      // [l.RUSSIAN]: 'Пользователь',
    },
    STAFF: {
      _: 99,
      [l.ENGLISH]: 'Staff',
      // [l.RUSSIAN]: 'Сотрудник',
    },
    ADMIN: {
      _: 999,
      [l.ENGLISH]: 'Admin',
      // [l.RUSSIAN]: 'Админ',
    },
  },

  TYPE: {
    INDIVIDUAL: {
      _: 0,
      [l.ENGLISH]: 'Individual',
      // [l.RUSSIAN]: 'Частное Лицо',
    },
    COMPANY: {
      _: 1,
      [l.ENGLISH]: 'Company',
      // [l.RUSSIAN]: 'Компания',
    },
  },
}

export const SEX = { // code needs to be incrementing value for slider
  ANY: {
    _: 0,
    [l.ENGLISH]: 'Any',
  },
  FEMALE: {
    _: 1,
    [l.ENGLISH]: 'Female',
  },
  MALE: {
    _: 2,
    [l.ENGLISH]: 'Male',
  }
}

export const PERMISSION = {
  // @note: permissions are defined as separate access levels.
  // To have full access, one must have all permissions defined below.
  // This way we keep the logic for checking permissions simple.
  // Example: User with permission {'1': true, '99': true} cannot update/delete.
  READ: {
    _: 1,
    [l.ENGLISH]: 'Read',
    // [l.RUSSIAN]: 'Читать',
  },
  UPDATE: {
    _: 2,
    [l.ENGLISH]: 'Update',
    // [l.RUSSIAN]: 'Обновить',
  },
  DELETE: {
    _: 3,
    [l.ENGLISH]: 'Delete',
    // [l.RUSSIAN]: 'Удалить',
  },
  MANAGE_USERS: { // add/remove users and set permissions
    _: 99, // same as STAFF authorization level
    [l.ENGLISH]: 'Manage Users',
    // [l.RUSSIAN]: 'Организовать Пользователей',
  },
}

DEFINITION_BY_VAL.USER_ROLE = definitionByValue(_USER.ROLE)
DEFINITION_BY_VAL.USER_TYPE = definitionByValue(_USER.TYPE)
DEFINITION_BY_VAL.SEX = definitionByValue(SEX)
ENUM.USER_ROLE = enumFrom(_USER.ROLE)
ENUM.USER_TYPE = enumFrom(_USER.TYPE)
ENUM.SEX = enumFrom(SEX)
