import { PanelPlugin } from '@grafana/data';
import { ChangerOptions } from './types';
import { ChangerPanel } from './components/ChangerPanel';

  export const plugin = new PanelPlugin<ChangerOptions>(ChangerPanel).setPanelOptions((builder) => {
    return builder
      .addBooleanSwitch({
        path: 'showDebug',
        name: 'Show Debug Output',
        defaultValue: false,
      })
  });
