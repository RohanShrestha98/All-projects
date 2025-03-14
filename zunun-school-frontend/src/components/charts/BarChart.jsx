import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const state = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jue', 'Jul'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
}

export function BarChart() {
    return (
        <div>
            <HorizontalBar data={state} />
        </div>
    );
  }