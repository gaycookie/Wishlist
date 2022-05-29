<template lang="pug">
.columns.is-multiline(style="padding-top: 22px;")
  .column.is-12
    .box.has-background-dark
      p.title.has-text-white
        | Manage Collection
  .column.is-12
    article.message
      .message-header 
        p Import Collection
      .message-body.has-background-dark.has-text-light
        .columns
          .column.is-8
            p Import a collection from a JSON or YAML file.
            p This will add all the products in the collection to your current collection.
          .column.is-4.my-auto
            .buttons.is-right
              label.button.is-info
                input(type="file" @change="importCollection($event)" accept="application/json" hidden)
                | Import JSON
              label.button.is-info
                input(type="file" @change="importCollection($event)" accept=".yml, .yaml" hidden)
                | Import YAML
  .column.is-12
    article.message
      .message-header 
        p Export Collection
      .message-body.has-background-dark.has-text-light
        .columns
          .column.is-8
            p Export your current collection to a JSON or YAML file.
            p This will export all the products in the collection to a file and download it.
          .column.is-4.my-auto
            .buttons.is-right
              button.button.is-info(@click="exportCollection('json')") Export JSON
              button.button.is-info(@click="exportCollection('yaml')") Export YAML

  .column.is-12
    article.message
      .message-header 
        p Clear Collection
      .message-body.has-background-dark.has-text-light
        .columns
          .column.is-8
            p This will remove all the products in the collection from your current collection.
            p
              b.has-text-danger This is permanent and cannot be undone.
          .column.is-4.my-auto
            .buttons.is-right
              button.button.is-danger(@click="clearCollection()") Clear Collection
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'ManageCollectionView',
  methods: {
    importCollection: function (event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(file);
        if (!file.name.match(/\.(yml|yaml|json)+$/)) {
          return Swal.fire({
            title: 'Invalid File',
            text: 'Please select a JSON or YAML file.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }

        if (file.name.endsWith('.json')) {
          const object = JSON.parse(e.target.result);
          this.$store.dispatch('importCollection', object);
        } else {
          const object = require('yaml').parse(e.target.result);
          this.$store.dispatch('importCollection', object);
        }

        Swal.fire({
          title: 'Collection imported!',
          text: 'The collection has been imported successfully.',
          icon: 'success',
          confirmButtonText: 'Yay!',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'button is-success'
          }
        });
      };
      reader.readAsText(file);
    },
    exportCollection: function (format) {
      const object = this.$store.getters.products;
      const link = document.createElement('a');

      if (object.length === 0) return Swal.fire({
        title: 'No products in collection',
        text: 'There are no products in your collection to export.',
        icon: 'info',
        confirmButtonText: 'OK'
      });

      if (format === 'json') {
        const json = JSON.stringify(object, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'collection.json';
        link.click();
        URL.revokeObjectURL(url);
      } else {
        const yaml = require('yaml').stringify(object);
        const blob = new Blob([yaml], { type: 'application/yaml' });
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'collection.yml';
        link.click();
        URL.revokeObjectURL(url);
      }
    },
    clearCollection: function () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, yeet it!',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'button is-danger',
          cancelButton: 'button is-light ml-2',
        }
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('clearCollection');
          Swal.fire({
            title: 'Collection cleared!',
            text: 'The collection has been cleared successfully.',
            icon: 'success',
            confirmButtonText: 'Yay!',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'button is-success'
            }
          });
        }
      });
    }
  }
}
</script>