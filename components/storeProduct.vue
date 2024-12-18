<template>
 <div color="primary" @click="dialog = true">
          <slot/>
        </div>
  
        <!-- Modal -->
        <v-dialog v-model="dialog" max-width="800">
          <v-card>
            <v-row no-gutters class="w-100 h-100">
              <v-col cols="6" class="d-flex align-center justify-center">
                <v-img :src="props.product.foto" height="470" cover />
              </v-col>
              <v-col cols="6" class="d-flex align-center justify-center">
                <v-card class="justify-center" height="100%" width="100%">
                  <v-card-text class="text-h6 font-weight-light flex align-end">
                    {{ props.loja.name }}
                  </v-card-text>
                  <v-card-text class="text-h6 font-weight-light flex align-end">
                    {{ props.product.name }}
                  </v-card-text>
                  <v-card-text class="text-h7 font-weight-light flex align-end">
                    Descrição: {{ props.product.description }}
                  </v-card-text>
                  <p class="ma-5 font-weight-medium">Valor: R$ {{ props.product.valor }}</p>
                  <v-btn  icon="mdi-trash-can" class="lixo-btn" color="cor_fundo">
                    
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
  </template>
  
  <script setup lang="ts">
  interface Props {
    product: any;
    loja: any;
  }
  
  const props = defineProps<Props>();
  const dialog = ref(false);
  </script>
  
  <style scoped>
  .v-card {
    position: relative;
  }
  
  .lixo-btn {
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
  </style>
  