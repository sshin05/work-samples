'use client';
import { useEffect, useReducer } from 'react';

// /**
//  * This module gets custom Cerberus colors and returns them as their hex values, namely for the usage of chartjs.
//  * @module chartjs
//  */

type ChartColorsState = {
  [key: string]: string;
};

const initialState: ChartColorsState = {
  qualitative100: '',
  qualitative200: '',
  qualitative300: '',
  qualitative400: '',
  qualitative500: '',
  qualitative700: '',
  sequential100: '',
  sequential200: '',
  sequential300: '',
  sequential400: '',
  page_surface_inverse: ''
};

const colors = [
  {
    type: 'SET_SEQUENTIAL100',
    variable: `--cerberus-colors-data-viz-sequential-100`
  },
  {
    type: 'SET_SEQUENTIAL200',
    variable: '--cerberus-colors-data-viz-sequential-200'
  },
  {
    type: 'SET_SEQUENTIAL300',
    variable: '--cerberus-colors-data-viz-sequential-300'
  },
  {
    type: 'SET_SEQUENTIAL400',
    variable: '--cerberus-colors-data-viz-sequential-400'
  },
  {
    type: 'SET_QUALITATIVE100',
    variable: '--cerberus-colors-data-viz-qualitative-100'
  },
  {
    type: 'SET_QUALITATIVE200',
    variable: '--cerberus-colors-data-viz-qualitative-200'
  },
  {
    type: 'SET_QUALITATIVE300',
    variable: '--cerberus-colors-data-viz-qualitative-300'
  },
  {
    type: 'SET_QUALITATIVE400',
    variable: '--cerberus-colors-data-viz-qualitative-400'
  },
  {
    type: 'SET_QUALITATIVE500',
    variable: '--cerberus-colors-data-viz-qualitative-500'
  },
  {
    type: 'SET_QUALITATIVE700',
    variable: '--cerberus-colors-data-viz-qualitative-700'
  },
  {
    type: 'SET_PAGE_SURFACE_INVERSE',
    variable: '--cerberus-colors-page-surface-inverse'
  }
];

function reducer(
  state: ChartColorsState,
  action: { type: string; value: string }
) {
  const key = action.type.replace('SET_', '').toLowerCase();
  return { ...state, [key]: action.value };
}

export function useChartColors() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;

      colors.forEach(({ type, variable }) => {
        dispatch({
          type,
          value: getComputedStyle(root).getPropertyValue(variable)
        });
      });
    }
  }, []);

  return state;
}
