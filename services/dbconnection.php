<?php
class Connection {

	protected $connection;

	public function Connection() {

		$conn = NULL;

		try {
			$conn = new PDO("mysql:host=localhost;dbname=task_list", "root", "root");
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			// echo "successfully connected to db <br>";
		} catch (PDOException $e) {
			echo 'ERROR: ' . $e->getMessage();
		}

		$this->connection = $conn;

	}

	// Show all records
	public function showAll() {

		try {
			$statement = $this->connection->prepare("SELECT * FROM tasks");
			$statement->execute();
			$result = $statement->fetchAll(PDO::FETCH_ASSOC);

			return json_encode($result);

		} catch (PDOException $e) {
			echo $e->getMessage();
		}
	}

	// Close database connection
	public function closeConnection() {
		$conn = null;
		return $this->connection = $conn;
	}

	// Delete all records
	public function deleteAll() {
		try {
			$statement = $this->connection->prepare("DELETE FROM tasks");
			$statement->execute();
		} catch (PDOException $e) {
			echo $e->getMessage();
		}
	}

	// TODO : insert the post data to the server
	public function insert($post) {

		try {
			$statement = $this->connection->prepare("INSERT INTO `tasks` VALUES (:id,:category, :task)");
			$statement->execute(array(
				':id' => $id,
				':category' => "super market",
				':task' => "xarti kouzinas",
			));

		} catch (PDOException $e) {
			echo "error $e " . $e->getMessage();
		}

	}

}

$d = new Connection();
echo $d->showAll();