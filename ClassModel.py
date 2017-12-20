import re
from enum import Enum


class DeclareType(Enum):
    PACKAGE = -3
    IMPORT = -2
    UNKNOWN = -1
    ANNOTATION = 0
    CLASS = 1
    FUNCTION = 2
    IMMUTABLE = 3
    MUTABLE = 4
    CONST = 5  # todo
    COMPANION = 6  # todo

    @staticmethod
    def get_keyword(self, declare_type):
        key_map = {
            self.IMMUTABLE: 'val',
            self.MUTABLE: 'var',
            self.FUNCTION: 'fun',
            self.CLASS: 'class',
            self.COMPANION: 'companion',
            self.CONST: 'const',
        }
        return key_map[declare_type]


class BaseDeclaration:
    parent = None
    name = ''
    params = {}


class Annotation(BaseDeclaration):
    def __init__(self):
        self.name = '@'

    def __init__(self, str_annotation):
        self.name = str_annotation


class EntityDeclaration(BaseDeclaration):
    def __init__(self):
        self.annotations = []
        self.member_list = []
        self.entity_type = ''
        self.return_type = ''


class EntityFile:
    path = ''
    lines = []
    package_name = ''
    import_list = []
    entity_declaration = None

    def __init__(self, file_path):
        self.path = file_path

        comment_line_pattern = re.compile('^\/\/.*')
        comment_begin_pattern = re.compile(r'^\s*\/\*.*')
        comment_end_pattern = re.compile(r'^\s*\*\/.*')
        class_pattern = re.compile('class\s+')
        class_with_curl = re.compile('class.+{')
        begin_with_dot = re.compile(r'^\s*\.')
        end_with_dot = re.compile(r'.+\.$')

        with open(self.path, 'rb') as file_open:
            try:
                self.lines = file_open.readlines()
                self.lines = list(map(lambda x: x.decode('utf-8').strip('\n').strip(), self.lines))
            except Exception as e:
                print(str(e))
                return

        for idx in range(len(self.lines)):
            if self.lines[idx].count('(') > self.lines[idx].count(')'):
                self.lines[idx + 1] = self.lines[idx] + '\n' + self.lines[idx + 1]
                self.lines[idx] = ''

            assert(len(re.findall(class_pattern, self.lines[idx])) < 2)
            if class_with_curl.match(self.lines[idx]):
                pass
            elif self.lines[idx].count('{') > self.lines[idx].count('}'):
                self.lines[idx + 1] = self.lines[idx] + '\n' + self.lines[idx + 1]
                self.lines[idx] = ''

            if begin_with_dot.match(self.lines[idx]):
                self.lines[idx] = self.lines[idx - 1] + '\n' + self.lines[idx]
                self.lines[idx - 1] = ''
            if end_with_dot.match(self.lines[idx]):
                self.lines[idx + 1] = self.lines[idx] + '\n' + self.lines[idx + 1]
                self.lines[idx] = ''

            if comment_end_pattern.match(self.lines[idx]):
                continue
            elif comment_begin_pattern.match(self.lines[idx]):
                self.lines[idx + 1] = self.lines[idx] + '\n' + self.lines[idx + 1]
                self.lines[idx] = ''

        self.lines = list(
            map(lambda x:
                (self.check_line(x), x)
                , list(filter(lambda x:
                              not comment_line_pattern.match(x) and len(x) > 0,
                              self.lines)
                       )
                )
        )
        print(self.lines)

    @staticmethod
    def check_line(line):
        package_pattern = re.compile('^package\s+')
        import_pattern = re.compile('^import\s+')
        annotation_begin_pattern = re.compile('^@.*')

        class_pattern = re.compile('class[\s|:|{]')
        function_pattern = re.compile('^\w*\s*fun')
        mutable_pattern = re.compile('^\w*\s*var')
        immutable_pattern = re.compile('^\w*\s*val')
        if class_pattern.match(line):
            return DeclareType.CLASS
        if package_pattern.match(line):
            return DeclareType.PACKAGE
        if import_pattern.match(line):
            return DeclareType.IMPORT
        if annotation_begin_pattern.match(line):
            return DeclareType.ANNOTATION
        if function_pattern.match(line):
            return DeclareType.FUNCTION
        if mutable_pattern.match(line):
            return DeclareType.MUTABLE
        if immutable_pattern.match(line):
            return DeclareType.IMMUTABLE
        return DeclareType.UNKNOWN

    def parse(self):
        self.entity_declaration = EntityDeclaration()
        curr_entity = EntityDeclaration()
        for tup in self.lines:
            if len(self.entity_declaration.name) > 1:
                if tup[0] == DeclareType.ANNOTATION:
                    curr_entity.annotations.append(tup[1])
                else:
                    if tup[0].value > 0:  # 是一个真正的东西
                        curr_entity.entity_type = tup[0]
                        curr_entity.name = tup[1].split(' ')
                    self.entity_declaration.member_list.append(curr_entity)
                    curr_entity = EntityDeclaration()
            else:
                if tup[0] == DeclareType.ANNOTATION:
                    self.entity_declaration.annotations.append(tup[1])
                if tup[0] == DeclareType.CLASS:
                    self.entity_declaration.name = tup[1].split(' ')

