#!/bin/base

message=$1
remote=$2
branchName=$3
defaultCommitDir="."

# 坚果云笔记目录
notesDir="${USERPROFILE}\\Nutstore\\1\\我的坚果云\\notes"

# 项目笔记目录
guideDir="D:\\project\\note-sites\\docs"

# 文件不存在则更改目录
if [ ! -e guideDir ]; then
  guideDir="F:\\project\\note-sites\\docs"
fi

if [ ! -e guideDir ]; then
  guideDir="E:\\yjb\\note-sites\\docs"
fi

# 排除的文件
ignoreFile=(Outher Script)

# 赋默认值, 报错信息不用管
${remote:="origin"} 2> /dev/null 
${branchName:="master"} 2> /dev/null
now=$(date "+%Y-%m-%d %H:%M:%S")


# while [ -d $message ]; do
#   read -p "请输入commit message: " message
# done

# 没有 commit 则使用日期信息
if [ -d $message ]; then
  message="${now}【更新】"
fi

# 替换关键字 now 为日期
message=${message/"now()"/"${now}"}

# 彩色输出
function logColorText() {
  case $2 in
    "success")
      echo -e "\033[32m [$0 tip]: $1 \033[0m"
    ;;
    "warning")
      echo -e "\033[33m [$0 tip]: $1 \033[0m"
    ;;
    "danger")
      echo -e "\033[31m [$0 tip]: $1 \033[0m"
    ;;
  esac
}

# 拷贝文件
function syncFile() {
  rm -rf $guideDir\\guide
  cp -frv $notesDir $guideDir
  cd $guideDir\\notes

  for file in ${ignoreFile[@]}; do
    rm -rf $file
  done

  mv $guideDir\\notes $guideDir\\guide
  cd -
}


# 判断上一个命令是否执行成功, 参数1成功提示, 参数2失败提示, 参数3退出码
function isPrevCommand() {
  if [ $? -eq 0 ]; then
    logColorText "$1" "success"
  else
    logColorText "$2" "warning"
    exit $3
  fi
}


# 部署函数
function deploy() {
  # --- build
  logColorText "开始打包" "success"

  start=$(date +%s)

  pnpm build

  isPrevCommand "打包成功" "打包失败" 1

  # --- git
  git add $1
  isPrevCommand "提交暂存区成功" "提交暂存区失败" 1

  git commit -m "$message"
  isPrevCommand "提交成功" "提交失败" 1

  git push $remote $branchName
  isPrevCommand "推送成功" "推送失败" 1

  end=$(date +%s)

  sum=$((end - start))
  logColorText "$0执行成功共用时${sum}s" "success"
  logColorText "$0开始自动化更新 Gitee Pages" "success"

  # --- Gitee Pages Active
  cd "gitee-active"
  pnpm start:ts
  cd - &> /dev/null

  git add .
  git commit -m "${now}【日志提交】"
  git push $remote $branchName
  exit 
}


logColorText "开始拷贝文件" "success"
syncFile
isPrevCommand "拷贝文件成功" "拷贝文件失败" 1

deploy $defaultCommitDir
