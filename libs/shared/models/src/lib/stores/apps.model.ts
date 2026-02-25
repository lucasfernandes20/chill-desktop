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
    description: 'Um timer para trabalhar e tomar descansos.',
    isVisible: true,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  },
  [AppsId[AppsEnum.TODO_LIST]]: {
    id: AppsId[AppsEnum.TODO_LIST],
    name: 'Lista de Tarefas',
    icon: 'list',
    description: 'Uma lista de tarefas para completar.',
    isVisible: true,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  },
  [AppsId[AppsEnum.NOTES]]: {
    id: AppsId[AppsEnum.NOTES],
    name: 'Notas',
    icon: 'note_alt',
    description: 'Uma lista de notas.',
    isVisible: true,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  },
  [AppsId[AppsEnum.MUSIC_PLAYER]]: {
    id: AppsId[AppsEnum.MUSIC_PLAYER],
    name: 'Player de Música',
    icon: 'music_note',
    description: 'Um player de música.',
    isVisible: true,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  },
  [AppsId[AppsEnum.SETTINGS]]: {
    id: AppsId[AppsEnum.SETTINGS],
    name: 'Configurações',
    icon: 'settings',
    description: 'Apenas algumas configurações...',
    isVisible: true,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
  },
};
