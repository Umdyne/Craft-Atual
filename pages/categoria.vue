<template>
    <v-app>
        <layout-default-header></layout-default-header>
        <v-main class="bg-cor_fundo">
            <v-container class="justify-center  h-100">
                <layout-go-back></layout-go-back>
                <v-row class="justify-center ">
                    <v-col cols="6">
                        
                
                    </v-col>
                </v-row>
                

                <v-card
                    class="mx-auto bg-transparent elevation-0 "
                    max-width="1000"
                >
                    <v-container fluid>
                    <v-row dense>
                        <v-col
                        v-for="card in cards"
                        :key="card.title"
                        :cols="card.flex"
                        >
                        <v-btn class="rounded-circle bg-transparent elevation-0" height="180" width="150">

                        
                        <v-card class="bg-transparent elevation-0"  >
                            <v-img 
                            :src="card.src"
                            class="align-center  rounded-circle"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="150px"
                            width="150px"
                            
                            cover
                            >
                            
                            </v-img>
                            <v-card-title class=" text-center text-black text-body-2  "  v-text="card.title"></v-card-title>
                            
                        </v-card>
                    </v-btn>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card>
                <v-divider
                    :thickness="3"
                    class="border-opacity-50 mt-15 mb-8"
                    color="black"
                    ></v-divider>
                
            </v-container>

        </v-main>
        
    </v-app>
</template>

<script setup lang="ts">
useRoute()

</script>
