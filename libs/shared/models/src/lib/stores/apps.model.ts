export enum AppsEnum {
  POMODORO = 'pomodoro',
  TODO_LIST = 'todo-list',
  NOTES = 'notes',
  MUSIC_PLAYER = 'music-player',
  SETTINGS = 'settings',
}

const AppsId: Record<AppsEnum, number> = {
  [AppsEnum.POMODORO]: 1,
  [AppsEnum.TODO_LIST]: 2,
  [AppsEnum.NOTES]: 3,
  [AppsEnum.MUSIC_PLAYER]: 4,
  [AppsEnum.SETTINGS]: 5,
};

export interface AppItem {
  id: number;
  name: string;
  icon: string;
  description?: string;
  isVisible?: boolean;
  isOpen?: boolean;
  isMinimized?: boolean;
  isMaximized?: boolean;
}

export type AppItemsList = Record<number, AppItem>;

export const appsList: AppItemsList = {
  [AppsId[AppsEnum.POMODORO]]: {
    id: AppsId[AppsEnum.POMODORO],
    name: 'Pomodoro',
    icon: 'timer',
    description: 'A timer for working and taking breaks.',
    isVisible: true,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  },
  [AppsId[AppsEnum.TODO_LIST]]: {
    id: AppsId[AppsEnum.TODO_LIST],
    name: 'To-do List',
    icon: 'list',
    description: 'A list of tasks to complete.',
    isVisible: true,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  },
  [AppsId[AppsEnum.NOTES]]: {
    id: AppsId[AppsEnum.NOTES],
    name: 'Notes',
    icon: 'note_alt',
    description: 'A list of notes.',
    isVisible: true,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  },
  [AppsId[AppsEnum.MUSIC_PLAYER]]: {
    id: AppsId[AppsEnum.MUSIC_PLAYER],
    name: 'Music Player',
    icon: 'music_note',
    description: 'A music player.',
    isVisible: true,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  },
  [AppsId[AppsEnum.SETTINGS]]: {
    id: AppsId[AppsEnum.SETTINGS],
    name: 'Settings',
    icon: 'settings',
    description: 'Just some settings...',
    isVisible: true,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  },
};
