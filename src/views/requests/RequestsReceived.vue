<template>
<div>
  <base-dialog :show="!!error" title="An error accurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <requests-item
          v-for="request in receivedRequest"
          :key="request.id"
          :email="request.userEmail"
          :message="request.message"
        ></requests-item>
      </ul>
      <h3 v-else>you haven't received any requests yet!</h3>
    </base-card>
  </section>
</div>
</template>

<script>
import RequestsItem from "../../components/requests/RequestsItem.vue";

export default {
  components: {
    RequestsItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequest() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  created(){
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/fetchRequests");
      } catch (error) {
        this.error = error.message || "something failed!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
