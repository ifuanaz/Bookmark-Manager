(function(){
    function BookmarksService ($http, $q) {
        const URLS = {
            FETCH: 'json/bookmarks.json'
        };

        let service = {
            getBookmarks: getBookmarks,
            getBookmarkById: getBookmarkById,
            createBookmark: createBookmark,
            deleteBookmark: deleteBookmark,
            editBookmark: editBookmark
        }, bookmarks;

        return service;

        function extract(result) {
            return result.data;
        }

        function cacheBookmarks(result) {
            bookmarks = extract(result);
            return bookmarks;
        }

        function getBookmarks() {
            let defered = $q.defer();

            if(bookmarks) {
                defered.resolve(bookmarks);
            }
            else {
                $http.get(URLS.FETCH).then(result => {
                    defered.resolve(cacheBookmarks(result))
                });
            }

            return defered.promise;
        }

        function getBookmarkById (id) {
            id = parseInt(id);
            return _.find(bookmarks, {id: id});
        }

        function createBookmark (bookmark) {
            bookmark.id = parseInt(_.uniqueId(1));
            bookmarks.push(bookmark);
        }

        function deleteBookmark (bookmark) {
            _.remove(bookmarks, {id: bookmark.id});
        }

        function editBookmark (bookmark) {
            let index = _.findIndex(bookmarks, {id: bookmark.id});
            bookmarks[index] = bookmark;
        }

    };


    angular.module('service.bookmarks', [])
    .service('BookmarksService', BookmarksService)
    ;

}())
