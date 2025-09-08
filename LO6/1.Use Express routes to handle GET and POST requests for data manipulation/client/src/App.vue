<template>
  <div>
    <h2>User List</h2>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>

    <h3>Add User</h3>
    <input v-model="newUser" placeholder="Enter name" />
    <button @click="addUser">Add</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      newUser: ""
    }
  },
  mounted() {
    // Fetch users from Express backend
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => this.users = data);
  },
  methods: {
    addUser() {
      fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.newUser })
      })
      .then(res => res.json())
      .then(user => {
        this.users.push(user);
        this.newUser = "";
      });
    }
  }
}
</script>
