import fs from "fs";

/**
 * Delete multiple files from the server.
 * @param {Array} filesToDelete Array of file paths to delete.
 * @returns {Promise<Array>} Promise that resolves with an array of deleted file paths.
 */
async function deleteFiles(filesToDelete) {
  const deleteOperations = [];

  // Loop through each file and create a delete operation
  filesToDelete.forEach((file) => {
    const filePath = file.path;

    // Create a promise for each delete operation
    const deletePromise = new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject({ path: filePath, error: err.message });
        } else {
          resolve({ path: filePath });
        }
      });
    });

    deleteOperations.push(deletePromise);
  });

  // Execute all delete operations concurrently
  const results = await Promise.all(deleteOperations);
  return results;
}

export { deleteFiles };
