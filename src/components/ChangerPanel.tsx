import React from 'react';
import { PanelProps } from '@grafana/data';
import { ChangerOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { locationService } from '@grafana/runtime'

interface Props extends PanelProps<ChangerOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

interface Indexable {
  [key: string]: any;  // Supports indexing with string keys
}

export const ChangerPanel: React.FC<Props> = ({ options, data, width, height }) => {

  const styles = useStyles2(getStyles);  
  
  const latest = new Map<string,string>()
  data.series.forEach(df =>
    df.fields.forEach(field => {
      for (let i = 0; i < field.values.length; i++) {
        const value = field.values.get(i)        
        const message = JSON.parse(String(value))        
        if(message && message.variable && message.value) {
          latest.set(message.variable,message.value)
        }
      }}      
    )
  )

  latest.forEach((value,variable)=>    {
    let obj: Indexable = {}
    obj["var-" + variable]=value
    locationService.partial(obj,true)    
  })
  let kvps = [...latest]
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      {options.showDebug ?
      <div className={styles.textBox}>                      
        {kvps.map(([variable,value]) =>             
        (<div key={variable}>{variable} = {value}</div>))}
      </div>:null}
    </div>
  );
};
