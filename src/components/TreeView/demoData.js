export default {
    id: 1,
    type: 'directory',
    name: 'contexts',
    files: [{
        id: 2,
        type: 'file',
        name: 'fileName',
    }],
    directories: [{
        id: 3,
        type: 'directory',
        name: 'parentDirectory',
        files:[{
            id: 4,
            type: 'file',
            name: 'childrenFile1'
        }],
        directories: [],
    },{
        id: 5,
        type: 'directory',
        name: 'cjhv',
        files:[{
            id: 6,
            type: 'file',
            name: 'childrenFile2'
        }],
        directories: [{
            id: 7,
            type: 'directory',
            name: 'KO_KR',
            files:[{
                id: 8,
                type: 'file',
                name: 'global'
            }],
            directories: [{
                id: 9,
                type: 'directory',
                name: 'alaska-grib',
                files:[{
                    id: 10,
                    type: 'file',
                    name: 'app.yaml'
                }],
                directories: [
                ],
            }],
        }],
    }]
};
