import * as migration_20260409_180609 from './20260409_180609';
import * as migration_20260409_210000 from './20260409_210000';

export const migrations = [
  {
    up: migration_20260409_180609.up,
    down: migration_20260409_180609.down,
    name: '20260409_180609'
  },
  {
    up: migration_20260409_210000.up,
    down: migration_20260409_210000.down,
    name: '20260409_210000'
  },
];
