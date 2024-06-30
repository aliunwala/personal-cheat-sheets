// Most of what is in this file is here:
// https://sequelize.org/docs/v6/core-concepts/model-instances/
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("user", {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: "green",
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER,
});

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

/**
 * Various instance methods
 */
{
  // Creating an instance
  const jane = User.build({ name: "Jane" });
  console.log(jane instanceof User); // true
  console.log(jane.name); // "Jane"
  await jane.save();
  console.log("Jane was saved to the database!");
}

{
  // Creating & Add to DB (create == build+save)
  const jane = await User.create({ name: "Jane" });
  // Jane exists in the database now!
}

{
  // Updating an instance
  const jane = await User.create({ name: "Jane" });
  console.log(jane.name); // "Jane"
  jane.name = "Ada";
  // the name is still "Jane" in the database
  await jane.save();
  // Now the name was updated to "Ada" in the database!
}
{
  // You can update several fields at once with the set method:
  const jane = await User.create({ name: "Jane" });

  jane.set({
    name: "Ada",
    favoriteColor: "blue",
  });
  // As above, the database still has "Jane" and "green"
  await jane.save();
  // The database now has "Ada" and "blue" for name and favorite color
}
{
  // Deleting an instance
  const jane = await User.create({ name: "Jane" });
  console.log(jane.name); // "Jane"
  await jane.destroy();
  // Now this entry was removed from the database
}
{
  // Reloading an instance
  const jane = await User.create({ name: "Jane" });
  console.log(jane.name); // "Jane"
  jane.name = "Ada";
  // the name is still "Jane" in the database
  await jane.reload();
  console.log(jane.name); // "Jane"
}
/**
 * Various findAll methods
 */
{
  // Find all users
  const users = await User.findAll();
  console.log(users.every((user) => user instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));
}
{
  // Find all w/ attributes
  Model.findAll({
    attributes: ["foo", ["bar", "baz"], "qux"],
  });
  // Same as SELECT foo, bar FROM ...
}
{
  // Find all w/ where
  Post.findAll({
    where: {
      authorId: 2,
    },
  });
  // SELECT * FROM post WHERE authorId = 2;
}
/** Full table queries */
{
  // Simple UPDATE queries
  // Change everyone without a last name to "Doe"
  await User.update(
    { lastName: "Doe" },
    {
      where: {
        lastName: null,
      },
    }
  );
}
{
  // Simple DELETE queries
  // Delete everyone named "Jane"
  await User.destroy({
    where: {
      firstName: "Jane",
    },
  });
}
{
  // Creating in bulk
  const captains = await Captain.bulkCreate([
    { name: "Jack Sparrow" },
    { name: "Davy Jones" },
  ]);
  console.log(captains.length); // 2
  console.log(captains[0] instanceof Captain); // true
  console.log(captains[0].name); // 'Jack Sparrow'
  console.log(captains[0].id); // 1 // (or another auto-generated value)
}
{
  // Limits and Pagination
  // Fetch 10 instances/rows
  Project.findAll({ limit: 10 });
  // Skip 8 instances/rows
  Project.findAll({ offset: 8 });
  // Skip 5 instances and fetch the 5 after that
  Project.findAll({ offset: 5, limit: 5 });
}
{
  // Counts
  console.log(`There are ${await Project.count()} projects`);
  const amount = await Project.count({
    where: {
      id: {
        [Op.gt]: 25,
      },
    },
  });
  console.log(`There are ${amount} projects with an id greater than 25`);
}
{
  // max, min and sum
  await User.max("age"); // 40
  await User.max("age", { where: { age: { [Op.lt]: 20 } } }); // 10
  await User.min("age"); // 5
  await User.min("age", { where: { age: { [Op.gt]: 5 } } }); // 10
  await User.sum("age"); // 55
  await User.sum("age", { where: { age: { [Op.gt]: 5 } } }); // 50
}
{
  // increment, decrement
  // Let's assume we have a user == 1, whose age is 10.
  await User.increment({ age: 5 }, { where: { id: 1 } }); // Will increase age to 15
  await User.increment({ age: -5 }, { where: { id: 1 } }); // Will decrease age to 5
}
/**
 * Model Querying - Finders
 */
{
  // The findByPk method obtains only a single entry from the table, using the provided primary key.
  const project = await Project.findByPk(123);
  if (project === null) {
    console.log("Not found!");
  } else {
    console.log(project instanceof Project); // true
    // Its primary key is 123
  }
}
{
  // The findOne method obtains the first entry it finds (that fulfills the optional query options, if provided).
  const project = await Project.findOne({ where: { title: "My Title" } });
  if (project === null) {
    console.log("Not found!");
  } else {
    console.log(project instanceof Project); // true
    console.log(project.title); // 'My Title'
  }
}
{
  // findOrCreate - will create an entry in the table unless it can find one fulfilling the query options
  // findAndCountAll - method is a convenience method that combines findAll and count
}
