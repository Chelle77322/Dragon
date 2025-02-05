import { defineConfig } from '@vue/cli-service'
import pkg from 'webpack';
const {DefinePlugin} = pkg;


        export default defineConfig({
          
         // ... other config
         configureWebpack: {
           plugins: [
              // eslint-disable-next-line no-undef
              new DefinePlugin({
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
            })
           ]
          },
          
          publicPath: process.env.NODE_ENV === 'production'
    ? '/DragOn/'
    : '/'
    
        })