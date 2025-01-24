<template>
  <div color="primary" @click="dialog = true">
    <slot />
  </div>

  <!-- Modal do Produto -->
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
            <!-- Botão de Lixeira -->
            <v-btn
              v-if="isOwner"
              icon="mdi-trash-can"
              class="lixo-btn"
              color="cor_fundo"
              @click="confirmDelete = true"
            >
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>

  <!-- Modal de Confirmação -->
  <v-dialog v-model="confirmDelete" max-width="500">
    <v-card>
      <v-card-title class="text-h6">
        Deseja realmente excluir este produto?
      </v-card-title>
      <v-card-actions>
        <v-btn color="red" text @click="deleteProduct">Excluir</v-btn>
        <v-btn color="blue" text @click="confirmDelete = false">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSupabase } from '~/composables/useSupabase';

interface Props {
  product: any;
  loja: any;
}

const userId = ref(localStorage.getItem('userId'));
const props = defineProps<Props>();
const dialog = ref(false);
const confirmDelete = ref(false);
const isOwner = ref(false);
const productToDelete = ref<string | null>(null);
const supabase = new useSupabase(); // Instância do Supabase

// Verificação do proprietário ao montar o componente
onMounted(() => {
  const userIdStored = localStorage.getItem('userId');
  if (userIdStored) {
    isOwner.value = props.loja && props.loja.user === userIdStored;
  }
});

// Função para chamar a exclusão do produto
async function handleDeleteProduct(productId: string) {
  try {
    const result = await deleteProduct(productId);

    if (result.success) {
      alert(result.message); // Exibir sucesso
      confirmDelete.value = false; // Fechar o modal de confirmação
    } else {
      alert(result.message); // Exibir erro
    }
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    alert('Ocorreu um erro ao tentar excluir o produto.');
  }
}

// Função para deletar o produto
async function deleteProduct(productId: string) {
  try {
    const userId = localStorage.getItem('userId'); // ID do usuário autenticado
    if (!userId) {
      alert('Usuário não autenticado!');
      return { success: false, message: 'Usuário não autenticado!' };
    }

    const { data, error } = await supabase
      .from('product')  // Tabela de produtos
      .delete()         // Deletar
      .eq('id', productId) // Filtra pelo ID do produto
      .eq('user', userId); // Filtra pelo ID do usuário (garantir que o produto é do usuário)

    if (error) {
      console.error('Erro ao excluir o produto:', error);
      return { success: false, message: 'Erro ao excluir o produto.' };
    }

    if (!data || data.length === 0) {
      return { success: false, message: 'Produto não encontrado ou usuário não autorizado.' };
    }

    return { success: true, message: 'Produto excluído com sucesso!' };
  } catch (error) {
    console.error('Erro inesperado ao excluir o produto:', error);
    return { success: false, message: 'Erro inesperado ao excluir o produto.' };
  }
}
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
