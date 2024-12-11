<template>
    <v-app class="bg-cor_fundo">
      <v-container fluid fill-height class="d-flex justify-center align-center h-100">
        <v-card class="d-flex align-center justify-center" height="25vw" width="50vw">
          <v-row no-gutters class="w-100 h-100">
            <v-col cols="12" class="d-flex align-center justify-center">
              <v-card class="bg-cor_card_login justify-center" height="100%" width="100%">
                <v-card-text class="text-center text-h5 font-weight-light mt-10">
                  Lista de Usuários
                </v-card-text>
                <v-list>
                  <v-list-item-group v-if="users.length">
                    <v-list-item v-for="user in users" :key="user.id">
                      <v-list-item-content>
                        <v-list-item-title>{{ user.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                  <v-list-item v-else>
                    <v-list-item-content>
                      <v-list-item-title>Nenhum usuário encontrado</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const users = ref([]);
  
  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      users.value = await response.json();
      console.log('Lista de usuários:', users.value);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }
  
  // Chama a função quando o componente for montado
  onMounted(() => {
    fetchUsers();
  });
  </script>
  